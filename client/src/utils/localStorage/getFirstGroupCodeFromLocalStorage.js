import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";

const { LOG_ERROR } = LOG_LEVELS;

export const getFirstGroupCodeFromLocalStorage = () => {
  try {
    const storedGroupCodes = getStoredGroupCodesFromLocalStorage();

    return storedGroupCodes?.length ? storedGroupCodes[0] : null;
  } catch (error) {
    debugLog(
      `Error retrieving the first groupCode from the storedGroupCodes array:`,
      { error: error.message },
      LOG_ERROR,
    );

    return null;
  }
};
