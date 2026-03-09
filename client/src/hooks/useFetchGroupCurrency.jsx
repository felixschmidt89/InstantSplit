import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupCurrency } from "../api/groups/fetchGroupCurrency";
import { debugLog, INFO, ERROR } from "../../../shared/utils/debug/debugLog.js";
import { useGroupApi } from "./api/useGroupApi.jsx";

const useFetchGroupCurrency = () => {
  const { t } = useTranslation();

  const { data, isFetched, isLoading, error, trigger } =
    useGroupApi(fetchGroupCurrency);

  useEffect(() => {
    if (!isFetched) {
      trigger()
        .then((result) => {
          if (!result?.currency) {
            debugLog("No currency found for group", null, INFO);
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
            { error: requestError.message },
            ERROR,
          );
        });
    }
  }, [isFetched, trigger]);

  return {
    groupCurrency: data?.currency || null,
    isFetched,
    isLoading,
    error: error ? t("generic-error-message") : null,
  };
};

export default useFetchGroupCurrency;
