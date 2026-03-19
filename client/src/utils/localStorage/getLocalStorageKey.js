import debugLog from "../../../../shared/utils/debug/debugLog.js";

const getLocalStorageKey = (key) => {
  try {
    const value = localStorage.getItem(key);

    return value;
  } catch (error) {
    debugLog(`Error accessing local storage key "${key}":`, error);

    return null;
  }
};

export default getLocalStorageKey;
