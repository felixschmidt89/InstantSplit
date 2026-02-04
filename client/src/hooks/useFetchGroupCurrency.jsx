import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { fetchGroupCurrency } from "../api/groups/fetchGroupCurrency";

const useFetchGroupCurrency = (groupCode) => {
  const { t } = useTranslation();
  const [groupCurrency, setGroupCurrency] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const data = await fetchGroupCurrency(groupCode);

        if (!data) {
          devLog("No group found for groupCode:", groupCode);
          setIsFetched(true);
          return;
        }

        devLog("Group currency fetched:", data);
        setGroupCurrency(data.currency);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group currency:", error);
        setError(t("generic-error-message"));
      }
    };

    if (groupCode) {
      getCurrency();
    }
  }, [groupCode, t]);

  return { groupCurrency, isFetched, error };
};

export default useFetchGroupCurrency;
