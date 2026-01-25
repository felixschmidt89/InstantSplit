import { debugLog } from "@client-utils/debug/debugLog";

export const setLocalStorageKey = (key, value) => {
  try {
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
