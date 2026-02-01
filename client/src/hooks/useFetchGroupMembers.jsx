import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { API_URL } from "../constants/apiConstants";
import { debugLog } from "../../../shared/utils/debug";

const useFetchGroupMembers = (groupCode) => {
  const { t } = useTranslation();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/byGroupCode/${groupCode}`,
        );
        const userData = response.data.users;
        const userNames = userData.map((user) => user.userName);
        debugLog("Group members fetched:", response);
        setGroupMembers(userNames);
        setIsFetched(true);
      } catch (error) {
        debugLog("Error fetching group members:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupMembers();
  }, [groupCode, t]);

  return { groupMembers, isFetched, error };
};

export default useFetchGroupMembers;
