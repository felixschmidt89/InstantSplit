// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

// API
import { API_URL } from "@client-constants/apiConstants";
/**
 * Custom hook for fetching group members.
 *
 * @param {string} groupCode - The groupCode of the group to fetch members for.
 * @returns {Object} - Object containing group members and fetch status.
 * @property {string[]} groupMembers - Array of group members' usernames.
 * @property {boolean} isFetched - Indicates whether the group members have been successfully fetched.
 * @property {Error|null} error - The error object if an error occurred during fetching, otherwise null.
 */
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
        devLog("Group members fetched:", response);
        setGroupMembers(userNames);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group members:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchGroupMembers();
  }, [groupCode]);

  return { groupMembers, isFetched, error };
};

export default useFetchGroupMembers;
