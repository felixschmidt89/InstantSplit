import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import getStoredGroupCodesFromLocalStorage from "./getStoredGroupCodesFromLocalStorage.js";

const { LOG_ERROR } = LOG_LEVELS;

const getFirstGroupCodeFromLocalStorage = () => {
  try {
    const storedGroupCodes = getStoredGroupCodesFromLocalStorage();

    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  } catch (error) {
    debugLog(
      "Error retrieving the first groupCode from the storedGroupCodes array:",
      { error: error.message },
      LOG_ERROR,
    );

    return null;
  }
};

export default getFirstGroupCodeFromLocalStorage;
