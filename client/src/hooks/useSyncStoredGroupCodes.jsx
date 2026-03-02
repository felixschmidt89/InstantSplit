import { useEffect } from "react";
import axios from "axios";
import {
  deleteGroupCodeFromLocalStorage,
  getStoredGroupCodesFromLocalStorage,
} from "../utils/localStorage";
import { API_ROUTES } from "../../../shared/constants/apiRoutesConstants";
import { API_URL } from "../constants/apiConstants";
import { debugLog } from "../../../shared/utils/debug";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";
import { useGroupContext } from "../context/GroupContext";

const { ERROR } = LOG_LEVELS;

const useSyncStoredGroupCodes = () => {
  const { setStoredGroupCodes } = useGroupContext();
  const { BASE, VALIDATE_GROUP_EXISTENCE_CONTINUOUS } = API_ROUTES.GROUPS;

  useEffect(() => {
    const syncWithServer = async () => {
      const storedGroupCodes = getStoredGroupCodesFromLocalStorage();
      if (!storedGroupCodes?.length) return;

      let isUpdated = false;

      await Promise.all(
        storedGroupCodes.map(async (groupCode) => {
          try {
            const endpoint = `${API_URL}/${BASE}/${groupCode}/${VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`;
            const { data } = await axios.get(endpoint);

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
  }, [BASE, VALIDATE_GROUP_EXISTENCE_CONTINUOUS, setStoredGroupCodes]);
};

export default useSyncStoredGroupCodes;
