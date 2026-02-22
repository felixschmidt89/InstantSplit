import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";
import { fetchGroupMembers } from "../api/users/fetchGroupMembers.js";
import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { usePolling } from "./usePolling.jsx";

const { LOG_ERROR } = LOG_LEVELS;

const useFetchGroupMembers = (groupCode) => {
  const { t } = useTranslation();

  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupCode) {
      setGroupMembers([]);
      setIsFetched(false);
      setError(null);
    }
  }, [groupCode]);

  const getMembers = useCallback(
    async (isPolling = false) => {
      if (!groupCode) return;

      try {
        const response = await fetchGroupMembers(groupCode);

        if (response?.users) {
          setGroupMembers(response.users);
          setIsFetched(true);
        }

        setError(null);
      } catch (err) {
        debugLog(
          "Hook Error: useFetchGroupMembers",
          { error: err.message },
          LOG_ERROR,
        );

        if (!isPolling) {
          setError(t("generic-error-message"));
        }
      }
    },
    [groupCode, t],
  );

  usePolling(getMembers);

  return {
    groupMembers,
    isFetched,
    error,
    refetch: getMembers,
  };
};

export default useFetchGroupMembers;
