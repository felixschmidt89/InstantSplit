import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { getActiveGroupCodeFromLocalStorage } from "./getActiveGroupCodeFromLocalStorage";
import { deleteActiveGroupCodeFromLocalStorage } from "./deleteActiveGroupCodeFromLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";

const { LOG_ERROR } = LOG_LEVELS;

export const deleteGroupCodeFromLocalStorage = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodesFromLocalStorage();

    const updatedCodes = storedGroupCodes.filter((code) => code !== groupCode);

    const activeGroupCode = getActiveGroupCodeFromLocalStorage();
    if (activeGroupCode === groupCode) {
      deleteActiveGroupCodeFromLocalStorage();
    }

    const success = setLocalStorageKey(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      updatedCodes,
    );

    if (success) {
      debugLog("GroupCode removed from local storage:", groupCode);
      return true;
    }

    return false;
  } catch (error) {
    debugLog(
      "Error deleting groupCode from local storage:",
      { error: error.message },
      LOG_ERROR,
    );
    return false;
  }
};
