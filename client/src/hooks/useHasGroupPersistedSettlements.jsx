import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";

import { fetchHasPersistedSettlements } from "../api/groups/fetchHasPersistedSettlements.js";

const useHasGroupPersistedSettlements = (groupCode) => {
  const { t } = useTranslation();

  const [hasPersistedSettlements, setHasPersistedSettlements] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersistedSettlementsStatus = async () => {
      try {
        const { hasPersistedOrder: exists } =
          await fetchHasPersistedSettlements(groupCode);

        setHasPersistedSettlements(exists);
        setIsFetched(true);
      } catch (err) {
        debugLog(
          "Error in hook fetching persisted settlements status",
          { error: err.message },
          LOG_LEVELS.LOG_ERROR,
        );
        setError(t("generic-error-message"));
        setIsFetched(true);
      }
    };

    if (groupCode) {
      fetchPersistedSettlementsStatus();
    }
  }, [groupCode, t]);

  return { hasPersistedSettlements, isFetched, error };
};

export default useHasGroupPersistedSettlements;
