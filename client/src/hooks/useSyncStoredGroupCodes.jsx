import { useEffect } from "react";
import axios from "axios";
import deleteGroupCodeFromLocalStorage from "../utils/localStorage/deleteGroupCodeFromLocalStorage.js";
import getStoredGroupCodesFromLocalStorage from "../utils/localStorage/getStoredGroupCodesFromLocalStorage.js";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpointsConstants";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import { useGroupContext } from "../context/GroupContext";

const { ERROR } = LOG_LEVELS;

const useSyncStoredGroupCodes = () => {
  const { setStoredGroupCodes } = useGroupContext();

  useEffect(() => {
    const syncWithServer = async () => {
      const storedGroupCodesInLocalStorage =
        getStoredGroupCodesFromLocalStorage();
      const hasStoredGroupCodesToSync =
        storedGroupCodesInLocalStorage?.length > 0;

      if (!hasStoredGroupCodesToSync) return;

      let wereStoredGroupCodesInLocalStorageModified = false;

      await Promise.all(
        storedGroupCodesInLocalStorage.map(async (groupCode) => {
          try {
            const endpoint =
              API_ENDPOINTS.GROUPS.VALIDATE_EXISTENCE_CONTINUOUS(groupCode);
            const { data } = await axios.get(endpoint);

            const groupExists = data?.exists;
            const shouldPurgeGroup = groupExists === false;

            if (shouldPurgeGroup) {
              debugLog(`Sync: Group ${groupCode} not found. Purging locally.`);
              deleteGroupCodeFromLocalStorage(groupCode);
              wereStoredGroupCodesInLocalStorageModified = true;
            }
          } catch (error) {
            debugLog(`Sync: Connection failed for ${groupCode}:`, error, ERROR);
          }
        }),
      );

      if (wereStoredGroupCodesInLocalStorageModified) {
        const synchronizedGroupCodes = getStoredGroupCodesFromLocalStorage();
        setStoredGroupCodes(synchronizedGroupCodes);
      }
    };

    syncWithServer();
  }, [setStoredGroupCodes]);
};

export default useSyncStoredGroupCodes;
