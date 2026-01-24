// React and Third-Party Libraries
import { useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { removeGroupCodeFromStoredGroupCodes } from "../utils/localStorageUtils";
import { getStoredGroupCodes } from "@/utils/localStorage";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Validates stored groupCodes and removes invalid ones from the local storage array.
 *
 * @returns {void}
 */
function useValidateAndCleanupStoredGroupCodes() {
  const storedGroupCodes = getStoredGroupCodes();

  useEffect(() => {
    const validateAndClean = async () => {
      await Promise.all(
        storedGroupCodes.map(async (groupCode) => {
          try {
            devLog(`Validating groupCode ${groupCode} in database`);
            const endpoint = `${apiUrl}/groups/${groupCode}/continuous-validate-existence`;
            const response = await axios.get(endpoint);

            if (response.data.exists === true) {
              devLog(`Groupcode ${groupCode} exists.`);
            } else {
              devLog(`Groupcode ${groupCode} does not exist.`);
              removeGroupCodeFromStoredGroupCodes(groupCode);
              devLog(`Groupcode ${groupCode} removed from stored groupCodes.`);
            }
          } catch (error) {
            devLog("Error validating group code:", error);
          }
        }),
      );
    };

    validateAndClean();
  }, [storedGroupCodes]);
}

export default useValidateAndCleanupStoredGroupCodes;
