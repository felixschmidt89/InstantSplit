import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupMemberTransactions } from "../api/users/fetchGroupMemberTransactions";
import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";

const { LOG_ERROR, INFO } = LOG_LEVELS;

const useGroupMemberTransactions = (userId) => {
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchGroupMemberTransactions(userId);
        const userTransactions = data?.userExpensesAndPayments || [];

        debugLog(
          `User ${userId} transactions fetched`,
          { count: userTransactions.length },
          INFO,
        );

        setTransactions(userTransactions);
      } catch (err) {
        debugLog(
          "Error in hook loading transactions",
          { error: err.message },
          LOG_ERROR,
        );
        setError(t("generic-error-message"));
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadTransactions();
    }
  }, [userId, t]);

  /**
   * Helper to remove a transaction from the local state (e.g. after deletion).
   */
  const removeTransaction = useCallback((itemId) => {
    setTransactions((prev) => {
      const updated = prev.filter((item) => item._id !== itemId);
      debugLog("Removed transaction from local state", { itemId }, INFO);
      return updated;
    });
  }, []);

  return { transactions, isLoading, error, removeTransaction };
};

export default useGroupMemberTransactions;
