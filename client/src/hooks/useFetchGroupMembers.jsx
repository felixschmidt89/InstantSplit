import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import fetchGroupMembers from "../api/members/fetchGroupMembers.js";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import usePolling from "./usePolling.jsx";

const { LOG_ERROR } = LOG_LEVELS;

const useFetchGroupMembers = (groupCode) => {
  const { t } = useTranslation();

  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFetchingRef = useRef(false);

  const getMembers = useCallback(
    async (isPolling = false) => {
      if (!groupCode || isFetchingRef.current) return;

      if (!isPolling && !isFetched) {
        setIsLoading(true);
      }

      isFetchingRef.current = true;

      try {
        const response = await fetchGroupMembers(groupCode);

        // Renamed from response.users to response.members
        if (response?.members) {
          setGroupMembers(response.members);
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
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [groupCode, t, isFetched],
  );

  useEffect(() => {
    if (!groupCode) {
      setGroupMembers([]);
      setIsFetched(false);
      setIsLoading(false);
      setError(null);
    }
  }, [groupCode]);

  useEffect(() => {
    if (groupCode && !isFetched && !isFetchingRef.current) {
      getMembers(false);
    }
  }, [groupCode, getMembers, isFetched]);

  usePolling(() => getMembers(true));

  return {
    groupMembers,
    isFetched,
    isLoading,
    error,
    refetch: getMembers,
  };
};

export default useFetchGroupMembers;
