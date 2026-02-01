import { useState, useEffect } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_URL } from "../constants/apiConstants";

const useFetchGroupCurrency = (groupCode) => {
  const { t } = useTranslation();
  const [groupCurrency, setGroupCurrency] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupCurrency = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/groups/currency/${groupCode}`,
        );

        const { data, status } = response;

        if (status === StatusCodes.NO_CONTENT) {
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

    fetchGroupCurrency();
  }, [groupCode, t]);

  return { groupCurrency, isFetched, error };
};

export default useFetchGroupCurrency;
