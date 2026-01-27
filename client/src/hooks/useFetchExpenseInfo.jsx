// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

import { API_URL } from "@client-constants/apiConstants";

/**
 * Custom hook for fetching expense information.
 *
 * @param {string} expenseId - The ID of the expense to fetch.
 * @returns {Object} An object containing expense information and potential error.
 * @property {Object|null} expenseInfo - The fetched expense information.
 * @property {boolean} isFetched - Indicates whether the expense info has been successfully fetched. 
* @property {Error|null} error - The error object if an error occurred

 */
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
  }, [expenseId]);

  return { expenseInfo, isFetched, error };
};

export default useFetchExpenseInfo;
