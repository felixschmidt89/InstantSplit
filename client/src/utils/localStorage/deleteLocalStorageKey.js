import { debugLog } from "@client-utils/debug/debugLog";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const deleteLocalStorageKey = (key) => {
  try {
    const targetItem = getLocalStorageKey(key);

    if (targetItem !== null) {
      localStorage.removeItem(key);
      debugLog(`Key "${key}" successfully deleted from local storage.`);
      return true;
    }

    debugLog(`Key "${key}" could not be deleted because it does not exist.`);
    return false;
  } catch (error) {
    debugLog(`Error deleting key "${key}":`, error);
    return false;
  }
};
