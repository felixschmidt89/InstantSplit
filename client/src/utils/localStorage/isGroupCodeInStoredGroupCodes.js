import { debugLog } from "../../../../shared/utils/debug";
import { getStoredGroupCodes } from "./getStoredGroupCodes";

export const isGroupCodeInStoredGroupCodes = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodes();

    return !!storedGroupCodes?.includes(groupCode);
  } catch (error) {
    debugLog("Error checking if groupCode is in storedGroupCodes:", error);

    return false;
  }
};
