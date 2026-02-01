import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { debugLog } from "../../../shared/utils/debug";
import { API_URL } from "../constants/apiConstants";

const useFetchGroupMemberData = (userId) => {
  const { t } = useTranslation();
  const [groupMemberData, setGroupMemberData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupMemberData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        const groupMemberData = response.data.user;
        debugLog("Group member data fetched:", groupMemberData);
        setGroupMemberData(groupMemberData);
        setIsFetched(true);
      } catch (error) {
        debugLog("Error fetching group member data:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupMemberData();
  }, [userId, t]);

  return { groupMemberData, isFetched, error };
};

export default useFetchGroupMemberData;
