import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import fetchGroupMemberTransactions from "../api/members/fetchGroupMemberTransactions.js";

const { LOG_ERROR, INFO } = LOG_LEVELS;

const useGroupMemberTransactions = (memberId) => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchTransactions = useCallback(async () => {
    if (!memberId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGroupMemberTransactions(memberId);
      const fetchedTransactions = data?.transactions || [];

      debugLog(
        `Member ${memberId} transactions fetched`,
        { count: fetchedTransactions.length },
        INFO,
      );

      setTransactions(fetchedTransactions);
    } catch (apiError) {
      debugLog(
        "Error fetching member transactions",
        { error: apiError.message, memberId },
        LOG_ERROR,
      );
      setError(t("generic-error-message"));
    } finally {
      setIsLoading(false);
    }
  }, [memberId, t]);

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
