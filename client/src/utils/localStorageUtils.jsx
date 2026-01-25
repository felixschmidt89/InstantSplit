import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageConstants";
import { currentTimeStamp } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

// TODO: Drop Local Storage from function names
// TODO:  Atomize local storage utility functions

export const isGroupCodeInStoredGroupCodes = (groupCode) => {
  try {
    const storedGroupCodes =
      JSON.parse(localStorage.getItem("storedGroupCodes")) || [];
    return storedGroupCodes.includes(groupCode);
  } catch (error) {
    devLog("Error checking if groupCode is in storedGroupCodes:", error);
    return false;
  }
};

export const isGroupCodeActive = (groupCode) => {
  const activeCode = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
  return activeCode === groupCode;
};

// TODO: Delete, use existing deleteActiveGroupCode.js instead
/**
 * Removes the 'activeGroupCode' property from local storage.
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */
export const removeActiveGroupCodeFromLocalStorage = () => {
  try {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE)) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
    }
    devLog("Active groupCode has been removed from local storage.");
    return true;
  } catch (error) {
    devLog("Error removing activeGroupCode from local storage:", error);
    return false;
  }
};

/**
 * Removes the groupCode from storedGroupCodes array in local storage, deletes storedGroupCodes array if then empty.
 *
 * @param {string} groupCode - The groupCode of the to be removed group.
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */
export const removeGroupCodeFromStoredGroupCodes = (groupCode) => {
  try {
    // Get the stored groupCodes array from local storage
    let storedGroupCodes = JSON.parse(localStorage.getItem("storedGroupCodes"));
    // Exclude the to be removed groupCode
    const updatedGroupCodes = storedGroupCodes.filter(
      (code) => code !== groupCode,
    );
    // Update the storedGroupCodes array or remove the key if it becomes empty
    if (updatedGroupCodes.length > 0) {
      localStorage.setItem(
        "storedGroupCodes",
        JSON.stringify(updatedGroupCodes),
      );
      devLog(
        "Previously active group code removed from storedGroupCodes array.",
      );
    } else {
      localStorage.removeItem("storedGroupCodes");
      devLog("Removed storedGroupCodes array.");
    }
    return true;
  } catch (error) {
    devLog("Error removing groupCode from storedGroupCodes:", error);
    return false;
  }
};

/**
 * Sets the 'viewState' property in local storage.
 * @param {string} value - The value to set for 'viewState'.
 * @returns {boolean} - Returns true if 'viewState' was successfully set, false if there was an error.
 */
export const setViewStateInLocalStorage = (view) => {
  try {
    localStorage.setItem("viewState", view);
    devLog(`ViewState has been set to ${view} in local storage.`);
    return true;
  } catch (error) {
    devLog(`Error setting viewState to ${view} in local storage.`, error);
    return false;
  }
};

/**
 * Removes the 'viewState' property from local storage.
 * @returns {boolean} - Returns true if 'viewState' was successfully removed, false if there was an error.
 */
export const removeViewStateFromLocalStorage = () => {
  try {
    if (localStorage.getItem("viewState")) {
      localStorage.removeItem("viewState");
    }
    devLog("ViewState has been removed from local storage.");
    return true;
  } catch (error) {
    devLog("Error removing viewState from local storage:", error);
    return false;
  }
};

/**
 * Sets the 'pwaCtaClosed' property and timestamp in local storage.
 * @param {string} value - The value to set for 'pwaCtaClosed'.
 * @returns {boolean} - Returns true if 'pwaCtaClosed' was successfully set, false if there was an error.
 */
export const setPwaCtaClosedInLocalStorage = () => {
  try {
    localStorage.setItem("pwaCtaClosed", currentTimeStamp);
    devLog(
      `pwaCtaClosed has been set to ${currentTimeStamp} in local storage.`,
    );
    return true;
  } catch (error) {
    devLog(`Error setting pwaCtaClosed in local storage.`, error);
    return false;
  }
};

/**
 * Adds groupCode to array of storedGroupCode in local storage if it doesn't already exist
 *
 * @param {string} groupCode - The groupCode to add to storedGroupCodes array
 * @returns {boolean} - Returns true if groupCode has been added to local storage, false in case of an error.
 */
export const storeGroupCodeInLocalStorage = (groupCode) => {
  try {
    let storedGroupCodes =
      JSON.parse(localStorage.getItem("storedGroupCodes")) || [];

    if (!storedGroupCodes.includes(groupCode)) {
      storedGroupCodes.push(groupCode);
      localStorage.setItem(
        "storedGroupCodes",
        JSON.stringify(storedGroupCodes),
      );
    }
    devLog(
      "GroupCode has been added to storedGroupCodes array in local storage:",
      groupCode,
    );
    return true;
  } catch (error) {
    devLog("Error storing groupCode in local storage:", error);
    return false;
  }
};

/**
 * Stores the current route in localStorage for nested navigation.
 * @param {string} route - The route to set in localStorage.
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 * @returns {null}
 */
export const setRouteInLocalStorage = (route, key = "previousRoute") => {
  localStorage.setItem(key, route);
  devLog(`${key} set in local storage:`, route);
  return null;
};

/**
 * Gets the previousRoute from localStorage.
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 * @returns {string} The retrieved route.
 */
export const getRouteFromLocalStorage = (key = "previousRoute") => {
  const route = localStorage.getItem(key) || `No ${key} stored.`;
  devLog(`${key} retrieved from local storage:`, route);
  return route;
};

/**
 * Deletes the previousRoute from localStorage.

 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 */
export const deleteRouteFromLocalStorage = (key = "previousRoute") => {
  localStorage.removeItem(key);
  devLog(`${key} removed from local storage`);
};
