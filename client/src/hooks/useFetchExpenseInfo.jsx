import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { fetchExpense } from "../api/expenses/fetchExpense";

const useFetchExpenseInfo = (expenseId) => {
  const { t } = useTranslation();
  const [expenseInfo, setExpenseInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpense = async () => {
      try {
        const data = await fetchExpense(expenseId);

        setExpenseInfo(data.expense);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching expense info:", error);
        setError(t("generic-error-message"));
      }
    };

    if (expenseId) {
      getExpense();
    }
  }, [expenseId, t]);

  return { expenseInfo, isFetched, error };
};

export default useFetchExpenseInfo;
