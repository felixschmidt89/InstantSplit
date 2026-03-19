import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import getStoredGroupCodesFromLocalStorage from "./getStoredGroupCodesFromLocalStorage.js";

const { LOG_ERROR } = LOG_LEVELS;

const isGroupCodeInLocalStorageStoredGroupCodes = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodesFromLocalStorage();

    return !!storedGroupCodes?.includes(groupCode);
  } catch (error) {
    debugLog(
      "Error checking if groupCode is in storedGroupCodes:",
      { error: error.message },
      LOG_ERROR,
    );

    return false;
  }
};

export default isGroupCodeInLocalStorageStoredGroupCodes;
