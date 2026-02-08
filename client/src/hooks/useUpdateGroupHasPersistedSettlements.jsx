import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { updateHasPersistedSettlements } from "../api/groups/updateHasPersistedSettlements";
import { debugLog } from "../../../shared/utils/debug/debugLog";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";

const { LOG_ERROR } = LOG_LEVELS;

const useUpdateGroupHasPersistedSettlements = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = useCallback(
    async (groupCode, status) => {
      setIsLoading(true);
      setError(null);

      try {
        await updateHasPersistedSettlements(groupCode, status);
        return true;
      } catch (error) {
        debugLog(
          "Error updating 'has persisted settlements' status",
          { error: error.message },
          LOG_ERROR,
        );
        setError(t("generic-error-message"));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return { updateStatus, isLoading, error };
};

export default useUpdateGroupHasPersistedSettlements;
