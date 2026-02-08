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

  const refetchTransactions = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGroupMemberTransactions(userId);

      const fetchedTransactions = data?.transactions || [];

      debugLog(
        `User ${userId} transactions fetched`,
        { count: fetchedTransactions.length },
        INFO,
      );

      setTransactions(fetchedTransactions);
    } catch (err) {
      debugLog(
        "Error fetching transactions",
        { error: err.message },
        LOG_ERROR,
      );
      setError(t("generic-error-message"));
    } finally {
      setIsLoading(false);
    }
  }, [userId, t]);

  useEffect(() => {
    refetchTransactions();
  }, [refetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    refetchTransactions,
  };
};

export default useGroupMemberTransactions;
