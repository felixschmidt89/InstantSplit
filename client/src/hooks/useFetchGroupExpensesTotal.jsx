import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupExpensesTotal } from "../api/expenses/fetchGroupExpensesTotal";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";
import { debugLog } from "../../../shared/utils/debug/debugLog";

const { LOG_ERROR } = LOG_LEVELS;

const useFetchGroupExpensesTotal = (groupCode) => {
  const { t } = useTranslation();

  const [expensesTotal, setExpensesTotal] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupCode) return;

    const getGroupExpensesTotal = async () => {
      try {
        const { expensesTotal } = await fetchGroupExpensesTotal(groupCode);

        setExpensesTotal(expensesTotal);
        setIsFetched(true);
      } catch (error) {
        debugLog(
          "Error in useFetchGroupExpensesTotal:",
          { error, groupCode },
          LOG_ERROR,
        );
        setError(t("generic-error-message"));
        setIsFetched(true);
      }
    };

    getGroupExpensesTotal();
  }, [groupCode, t]);

  return { expensesTotal, isFetched, error };
};

export default useFetchGroupExpensesTotal;
