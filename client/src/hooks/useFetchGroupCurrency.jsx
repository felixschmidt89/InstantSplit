import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import fetchGroupCurrency from "../api/groups/fetchGroupCurrency.js";
import useGroupApi from "./api/useGroupApi.jsx";

const useFetchGroupCurrency = () => {
  const { t } = useTranslation();

  const { data, isFetched, isLoading, error, trigger } =
    useGroupApi(fetchGroupCurrency);

  const groupCurrency = data?.currency || null;

  // TODO: Update error handling to be more specific based on error type/status code
  const errorMessage = useMemo(() => {
    return error ? t("generic-error-message") : null;
  }, [error, t]);

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
