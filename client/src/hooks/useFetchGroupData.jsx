import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupData } from "../api/groups/fetchGroupData";

import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";
import { useApi } from "./api/useApi.jsx";

const { INFO, LOG_ERROR } = LOG_LEVELS;

const useFetchGroupData = (groupCode) => {
  const { t } = useTranslation();

  const { data, isFetched, isLoading, error, trigger } = useApi(fetchGroupData);

  useEffect(() => {
    if (groupCode && !isFetched) {
      trigger(groupCode)
        .then((result) => {
          if (!result) {
            debugLog("No group found for groupCode:", { groupCode }, INFO);
          } else {
            debugLog("Group data fetched:", { result }, INFO);
          }
        })
        .catch((requestError) => {
          debugLog(
            "Error fetching group data:",
            { error: requestError.message, groupCode },
            LOG_ERROR,
          );
        });
    }
  }, [groupCode, isFetched, trigger]);

  return {
    groupData: data,
    isFetched,
    isLoading,
    error: error ? t("generic-error-message") : null,
  };
};

export default useFetchGroupData;
