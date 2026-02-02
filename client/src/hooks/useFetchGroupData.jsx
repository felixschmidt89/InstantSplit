// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { API_URL } from "@client-constants/apiConstants";

/**
 * Custom hook for fetching group data.
 *
 * @param {string} groupCode - The groupCode of the group to fetch data for
 * @returns {Object} - An object containing group information and potential error.
 * @property {Object|null} groupData - The fetched group data
 *  @property {boolean} isFetched - Indicates whether the group data has been successfully fetched.
 * @property {Error|null} error - The error object if an error occurred
 *
 */
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
  }, [groupCode]);

  return { groupData, isFetched, error };
};

export default useFetchGroupData;
