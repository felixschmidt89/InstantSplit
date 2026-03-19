import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

const { LOG_ERROR } = LOG_LEVELS;

const getStoredGroupCodesFromLocalStorage = () => {
  try {
    const storedCodes = getLocalStorageKey(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
    );

    if (!storedCodes) {
      return [];
    }

    return JSON.parse(storedCodes);
  } catch (error) {
    debugLog(
      "Error parsing storedGroupCodes from local storage:",
      { error: error.message },
      LOG_ERROR,
    );

    return [];
  }
};

export default getStoredGroupCodesFromLocalStorage;
