import debugLog from "../../../../shared/utils/debug/debugLog.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

const deleteLocalStorageKey = (key) => {
  try {
    const targetItem = getLocalStorageKey(key);

    if (targetItem !== null) {
      localStorage.removeItem(key);
      return true;
    }

    return false;
  } catch (error) {
    debugLog(`Error deleting key "${key}":`, error);

    return false;
  }
};

export default deleteLocalStorageKey;
