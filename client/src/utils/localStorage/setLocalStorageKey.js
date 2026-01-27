import { debugLog } from "@shared-utils/debug/debugLog";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const setLocalStorageKey = (key, value) => {
  try {
    if (value === null) {
      return deleteLocalStorageKey(key);
    }

    const valueToStore =
      typeof value === "object" ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
    debugLog(`Key "${key}" successfully set in local storage.`);
    return true;
  } catch (error) {
    debugLog(`Error setting key "${key}" in local storage:`, error);
    return false;
  }
};
