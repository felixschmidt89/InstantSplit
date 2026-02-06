import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchExpense } from "../api/expenses/fetchExpense";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";
import { debugLog } from "../../../shared/utils/debug/debugLog";

const { INFO, LOG_ERROR } = LOG_LEVELS;

const useFetchExpenseInfo = (expenseId) => {
  const { t } = useTranslation();
  const [expenseInfo, setExpenseInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpense = async () => {
      try {
        const { expense } = await fetchExpense(expenseId);

        if (!expense) {
          debugLog("No expense found for expenseId:", { expenseId }, INFO);
          setIsFetched(true);
          return;
        }

        debugLog("Expense info fetched:", { expense }, INFO);
        setExpenseInfo(expense);
        setIsFetched(true);
      } catch (error) {
        debugLog(
          "Error fetching expense info:",
          { error: error.message, expenseId },
          LOG_ERROR,
        );
        setError(t("generic-error-message"));
        setIsFetched(true);
      }
    };

    if (expenseId) {
      getExpense();
    }
  }, [expenseId, t]);

  return { expenseInfo, isFetched, error };
};

export default useFetchExpenseInfo;
