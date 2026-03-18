import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";

const { LOG_ERROR } = LOG_LEVELS;

export const isGroupCodeInLocalStorageStoredGroupCodes = (groupCode) => {
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
