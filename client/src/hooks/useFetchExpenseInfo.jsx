import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_URL } from "../constants/apiConstants";

const useFetchExpenseInfo = (expenseId) => {
  const { t } = useTranslation();
  const [expenseInfo, setExpenseInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/expenses/${expenseId}`);
        const expenseData = response.data.expense;
        devLog("Expense info fetched:", response);
        setExpenseInfo(expenseData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching expense info:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchExpenseInfo();
  }, [expenseId, t]);

  return { expenseInfo, isFetched, error };
};

export default useFetchExpenseInfo;
