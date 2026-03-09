import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupCurrency } from "../api/groups/fetchGroupCurrency";

import { debugLog, INFO, ERROR } from "../../../shared/utils/debug/debugLog.js";
import { useApi } from "./api/useApi.jsx";

const useFetchGroupCurrency = (groupCode) => {
  const { t } = useTranslation();

  const { data, isFetched, isLoading, error, trigger } =
    useApi(fetchGroupCurrency);

  useEffect(() => {
    if (groupCode && !isFetched) {
      trigger(groupCode)
        .then((result) => {
          if (!result?.currency) {
            debugLog("No group found for groupCode:", { groupCode }, INFO);
          } else {
            debugLog(
              "Group currency fetched:",
              { currency: result.currency },
              INFO,
            );
          }
        })
        .catch((requestError) => {
          debugLog(
            "Error fetching group currency:",
            { error: requestError.message, groupCode },
            ERROR,
          );
        });
    }
  }, [groupCode, isFetched, trigger]);

  return {
    groupCurrency: data?.currency || null,
    isFetched,
    isLoading,
    error: error ? t("generic-error-message") : null,
  };
};

export default useFetchGroupCurrency;
