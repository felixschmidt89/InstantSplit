import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";

import { fetchHasPersistedSettlements } from "../api/groups/fetchHasPersistedSettlements.js";

const useHasGroupPersistedSettlements = (groupCode) => {
  const { t } = useTranslation();
  const [hasPersistedOrder, setHasPersistedOrder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPersistedOrder = async () => {
      try {
        const { hasPersistedOrder: exists } =
          await fetchHasPersistedSettlements(groupCode);

        setHasPersistedOrder(exists);
        setIsFetched(true);
      } catch (err) {
        debugLog(
          "Error in hook fetching persisted order status",
          { error: err.message },
          LOG_LEVELS.LOG_ERROR,
        );
        setError(t("generic-error-message"));
        setIsFetched(true);
      }
    };

    if (groupCode) {
      getPersistedOrder();
    }
  }, [groupCode, t]);

  return { hasPersistedOrder, isFetched, error };
};

export default useHasGroupPersistedSettlements;
