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

  const loadTransactions = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGroupMemberTransactions(userId);

      const { transactions: fetchedTransactions = [] } = data || {};

      debugLog(
        `User ${userId} transactions fetched`,
        {
          count: fetchedTransactions.length,
          expenses: data?.expenseCount,
          payments: data?.paymentCount,
        },
        INFO,
      );

      setTransactions(fetchedTransactions);
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
  }, [userId, t]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const removeTransactionFromLocalState = useCallback((itemId) => {
    setTransactions((prev) => {
      const updated = prev.filter(
        (item) => (item._id || item.itemId) !== itemId,
      );
      debugLog("Removed transaction from local state", { itemId }, INFO);
      return updated;
    });
  }, []);

  return {
    transactions,
    isLoading,
    error,
    removeTransactionFromLocalState,
    refetchTransactions: loadTransactions,
  };
};

export default useGroupMemberTransactions;
