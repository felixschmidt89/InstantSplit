import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import deleteActiveGroupCodeFromLocalStorage from "./deleteActiveGroupCodeFromLocalStorage.js";
import getActiveGroupCodeFromLocalStorage from "./getActiveGroupCodeFromLocalStorage.js";
import getStoredGroupCodesFromLocalStorage from "./getStoredGroupCodesFromLocalStorage.js";
import setLocalStorageKey from "./setLocalStorageKey.js";

const { LOG_ERROR } = LOG_LEVELS;

const deleteGroupCodeFromLocalStorage = (groupCode) => {
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

export default deleteGroupCodeFromLocalStorage;
