import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { debugLog } from "@client-utils/debug/debugLog";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getStoredGroupCodes = () => {
  try {
    const storedCodes = getLocalStorageKey(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
    );

    if (!storedCodes) {
      return [];
    }

    return JSON.parse(storedCodes);
  } catch (error) {
    debugLog("Error parsing storedGroupCodes from local storage:", error);
    return [];
  }
};
