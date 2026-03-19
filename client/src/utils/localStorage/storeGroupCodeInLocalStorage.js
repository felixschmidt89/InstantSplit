import debugLog from "../../../../shared/utils/debug/debugLog.js";

import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";

const { LOG_ERROR } = LOG_LEVELS;

export const storeGroupCodeInLocalStorage = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodesFromLocalStorage();

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
    debugLog(
      "Error storing groupCode in local storage:",
      { error: error.message },
      LOG_ERROR,
    );
    return false;
  }
};
