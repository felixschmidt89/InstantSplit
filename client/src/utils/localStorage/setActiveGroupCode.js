import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { debugLog } from "@client-utils/debug/debugLog";

export const setActiveGroupCode = (groupCode) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE, groupCode);
    debugLog("GroupCode set to active:", groupCode);
    return true;
  } catch (error) {
    debugLog("Error setting groupCode to active", error);
    return false;
  }
};
