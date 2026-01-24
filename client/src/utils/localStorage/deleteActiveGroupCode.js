import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { debugLog } from "@client-utils/debug/debugLog";

export const deleteActiveGroupCode = () => {
  try {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE)) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
    }

    debugLog("Active groupCode has been removed from local storage.");
    return true;
  } catch (error) {
    debugLog("Error removing activeGroupCode from local storage:", error);
    return false;
  }
};
