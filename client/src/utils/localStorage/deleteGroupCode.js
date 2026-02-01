import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { getActiveGroupCode } from "./getActiveGroupCode";
import { deleteActiveGroupCode } from "./deleteActiveGroupCode";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { debugLog } from "../../../../shared/utils/debug";

export const deleteGroupCode = (groupCode) => {
  try {
    const storedGroupCodes = getStoredGroupCodes();

    const updatedCodes = storedGroupCodes.filter((code) => code !== groupCode);

    const activeGroupCode = getActiveGroupCode();
    if (activeGroupCode === groupCode) {
      deleteActiveGroupCode();
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
    debugLog("Error deleting groupCode from local storage:", error);
    return false;
  }
};
