// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

import { API_URL } from "@client-constants/apiConstants";

/**
 * Custom hook for fetching a group member's data.
 *
 * @param {string} userId - The ID of the group member to fetch data for.
 * @returns {Object} An object containing group member data and potential error.
 * @property {Object|null} groupMemberData - The fetched group member data.
 *  @property {boolean} isFetched - Indicates whether the group member's data has been successfully fetched.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
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
        devLog("Group member data fetched:", groupMemberData);
        setGroupMemberData(groupMemberData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group member data:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupMemberData();
  }, [userId, t]);

  return { groupMemberData, isFetched, error };
};

export default useFetchGroupMemberData;
