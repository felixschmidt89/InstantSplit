import { useState, useEffect } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_URL } from "../constants/apiConstants";

const useFetchGroupData = (groupCode) => {
  const { t } = useTranslation();
  const [groupData, setGroupData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${API_URL}/groups/${groupCode}`);
        const fetchedGroupData = response.data;

        if (response.status === StatusCodes.NO_CONTENT) {
          devLog("No group found for groupCode:", groupCode);
          setIsFetched(true);
          return;
        }

        devLog("GroupData fetched:", response);
        setGroupData(fetchedGroupData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group data:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupData();
  }, [groupCode, t]);

  return { groupData, isFetched, error };
};

export default useFetchGroupData;
