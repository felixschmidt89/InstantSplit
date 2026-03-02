import { useEffect } from "react";
import axios from "axios";
import {
  deleteGroupCodeFromLocalStorage,
  getStoredGroupCodesFromLocalStorage,
} from "../utils/localStorage";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";
import { debugLog } from "../../../shared/utils/debug";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";
import { useGroupContext } from "../context/GroupContext";

const { ERROR } = LOG_LEVELS;

const useSyncStoredGroupCodes = () => {
  const { setStoredGroupCodes } = useGroupContext();

  useEffect(() => {
    const syncWithServer = async () => {
      const storedGroupCodes = getStoredGroupCodesFromLocalStorage();
      if (!storedGroupCodes?.length) return;

      let isUpdated = false;

      await Promise.all(
        storedGroupCodes.map(async (groupCode) => {
          try {
            const { data } = await axios.get(
              API_ENDPOINTS.GROUPS.VALIDATE_EXISTENCE_CONTINUOUS(groupCode),
            );

            if (!data?.exists) {
              debugLog(
                `Sync: Group ${groupCode} not found on server. Purging locally.`,
              );
              deleteGroupCodeFromLocalStorage(groupCode);
              isUpdated = true;
            }
          } catch (error) {
            debugLog(`Sync: Request failed for ${groupCode}:`, error, ERROR);
          }
        }),
      );

      if (isUpdated) {
        const updatedCodes = getStoredGroupCodesFromLocalStorage();
        setStoredGroupCodes(updatedCodes);
      }
    };

    syncWithServer();
  }, [setStoredGroupCodes]);
};

export default useSyncStoredGroupCodes;
