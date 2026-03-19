import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import fetchGroupCurrency from "../api/groups/fetchGroupCurrency.js";
import useGroupApi from "./api/useGroupApi.jsx";

const useFetchGroupCurrency = () => {
  const { t } = useTranslation();

  const { data, isFetched, isLoading, error, trigger } =
    useGroupApi(fetchGroupCurrency);

  // TODO: Update error handling to be more specific based on error type/status code
  const hasError = Boolean(error);
  const errorMessage = hasError ? t("generic-error-message") : null;
  const groupCurrency = data?.currency || null;

  useEffect(() => {
    if (!isFetched) {
      trigger();
    }
  }, [isFetched, trigger]);

  return {
    groupCurrency,
    isFetched,
    isLoading,
    error: errorMessage,
  };
};

export default useFetchGroupCurrency;
