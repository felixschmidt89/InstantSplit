import { debugLog } from "@client-utils/debug/debugLog";

export const getLocalStorageKey = (key) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      debugLog(`Local storage key "${key}" is empty/null.`);
    }

    return value;
  } catch (error) {
    debugLog(`Error accessing local storage key "${key}":`, error);
    return null;
  }
};
