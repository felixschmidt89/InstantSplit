import { devLog } from "@client-utils/errorUtils";
import { getStoredGroupCodes } from "./getStoredGroupCodes";

export const isGroupCodeInStoredGroupCodes = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodes();

    return !!storedGroupCodes?.includes(groupCode);
  } catch (error) {
    devLog("Error checking if groupCode is in storedGroupCodes:", error);

    return false;
  }
};
