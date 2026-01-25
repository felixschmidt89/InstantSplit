import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { debugLog } from "@client-utils/debug/debugLog";
import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const storeGroupCode = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodes();

    if (!storedGroupCodes.includes(groupCode)) {
      const updatedCodes = [...storedGroupCodes, groupCode];

      const success = setLocalStorageKey(
        LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
        updatedCodes,
      );

      if (success) {
        debugLog("GroupCode added to local storage:", groupCode);
        return true;
      }
      return false;
    }

    return true;
  } catch (error) {
    debugLog("Error storing groupCode in local storage:", error);
    return false;
  }
};
