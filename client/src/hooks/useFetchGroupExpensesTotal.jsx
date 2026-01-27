// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

import { API_URL } from "@client-constants/apiConstants";

/**
 * Custom hook for fetching group expenses total.
 *
 * @param {string} groupCode - The groupCode of the group to fetch expenses total for.
 * @returns {Object} - Object containing group expenses total and fetch status.
 * @property {number|null} expensesTotal - The total expenses for the specified group, or null if not fetched yet.
 * @property {boolean} isFetched - Indicates whether the group expenses total has been successfully fetched.
 * @property {Error|null} error - The error object if an error occurred during fetching, otherwise null.
 */
const useFetchGroupExpensesTotal = (groupCode) => {
  const { t } = useTranslation();
  const [expensesTotal, setExpensesTotal] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupExpensesTotal = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/expenses/totalExpenses/${groupCode}`,
        );
        setExpensesTotal(response.data.expensesTotal);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group expenses total:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupExpensesTotal();
  }, [groupCode, t]);

  return { expensesTotal, isFetched, error };
};

export default useFetchGroupExpensesTotal;
