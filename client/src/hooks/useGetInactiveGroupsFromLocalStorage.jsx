// React and Third-Party Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { getStoredGroupCodes } from "@/utils/localStorage/index.js";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
// TODO: inactive term is inaccurate
// TODO: Improve logic and namings, do not hardcode path
/**
 * Custom React hook for fetching inactive group names stored in local storage
 *
 *
 * @param {string} groupCode - The currently active groupCode.
 * @returns {Object} An object containing inactive group names, fetch status, and error.
 * @property {Array} inactiveGroupNamesAndGroupCodes - Array of inactive group names and their groupCodes.
 * @property {boolean} isFetched - Flag indicating whether the data has been fetched.
 * @property {null|Error} error - An error object if there's an issue during data fetching or transforming.
 */
const useGetInactiveGroupsFromLocalStorage = (groupCode) => {
  const { t } = useTranslation();

  const [inactiveGroupNamesAndGroupCodes, setInactiveGroupNamesAndGroupCodes] =
    useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndTransformGroupNames = async () => {
      try {
        const groupCodesArray = getStoredGroupCodes();

        if (!groupCodesArray) {
          devLog("No groupCode stored in local storage.");
          return;
        }

        const groupCodesString = groupCodesArray.join(",");
        devLog("Stored groupCodes string:", groupCodesString);

        const response = await axios.get(
          `${apiUrl}/groups/StoredGroupNames?storedGroupCodes=${groupCodesString}`,
        );
        devLog("Group names fetched:", response);

        const allGroupNamesAndGroupCodes =
          response.data.groupNamesAndGroupCodes;
        devLog("All associated group names:", allGroupNamesAndGroupCodes);

        // Remove the currently active group
        const filteredGroupNamesAndGroupCodes =
          allGroupNamesAndGroupCodes.filter(
            (group) => group.groupCode !== groupCode,
          );
        setInactiveGroupNamesAndGroupCodes(filteredGroupNamesAndGroupCodes);
        devLog(
          "Inactive associated group names:",
          filteredGroupNamesAndGroupCodes,
        );
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching and transforming group names:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchAndTransformGroupNames();
  }, [groupCode, t]);

  return { inactiveGroupNamesAndGroupCodes, isFetched, error };
};

export default useGetInactiveGroupsFromLocalStorage;
