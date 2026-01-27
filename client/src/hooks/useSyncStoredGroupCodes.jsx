import { useEffect, useMemo } from "react";
import axios from "axios";

import { API_URL } from "@client-constants/apiConstants";
import {
  deleteGroupCode,
  getStoredGroupCodes,
} from "@client-utils/localStorage";
import { API_ROUTES } from "@shared-constants/apiRoutesConstants";
import { debugLog } from "@shared-utils/debug/debugLog";

const useSyncStoredGroupCodes = () => {
  const storedGroupCodes = useMemo(() => getStoredGroupCodes(), []);

  const { GROUPS_BASE, VALIDATE_GROUP_EXISTENCE_CONTINUOUS } =
    API_ROUTES.GROUPS;

  useEffect(() => {
    const syncWithServer = async () => {
      if (!storedGroupCodes?.length) return;

      await Promise.all(
        storedGroupCodes.map(async (groupCode) => {
          try {
            const endpoint = `${API_URL}/${GROUPS_BASE}/${groupCode}/${VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`;

            const { data } = await axios.get(endpoint);

            if (!data?.exists) {
              debugLog(`Group ${groupCode} not found. Delete locally.`);
              deleteGroupCode(groupCode);
            }
          } catch (error) {
            debugLog(`Sync failed for ${groupCode}:`, error);
          }
        }),
      );
    };

    syncWithServer();
  }, [storedGroupCodes, GROUPS_BASE, VALIDATE_GROUP_EXISTENCE_CONTINUOUS]);
};

export default useSyncStoredGroupCodes;
