import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageConstants";
import { currentTimeStamp } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

export const getActiveGroupCode = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);

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
  const activeCode = localStorage.getItem("activeGroupCode");
  return activeCode === groupCode;
};

/**
 * Removes the 'activeGroupCode' property from local storage.
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */
export const removeActiveGroupCodeFromLocalStorage = () => {
  try {
    if (localStorage.getItem("activeGroupCode")) {
      localStorage.removeItem("activeGroupCode");
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
 * Retrieves the first groupCode from the 'storedGroupCodes' array in local storage.
 *
 * @returns {string|null} - Returns the first groupCode if available, or null if the array is empty or not present.
 */
export const getFirstGroupCodeInStoredGroupCodesArray = () => {
  try {
    // Get the storedGroupCodes array from local storage
    const storedGroupCodes = JSON.parse(
      localStorage.getItem("storedGroupCodes"),
    );

    // Return the first groupCode if the array is not empty
    return storedGroupCodes && storedGroupCodes.length > 0
      ? storedGroupCodes[0]
      : null;
  } catch (error) {
    devLog(
      "Error retrieving the first groupCode from the storedGroupCodes array:",
      error,
    );
    return null;
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
 * Sets groupCode as currently active in local storage.
 *
 * @param {string|null} groupCode - The groupCode to set active. If null, clears the active groupCode.
 * @returns {boolean|null} - Returns true if groupCode has been set active, false in case of an error, and null if groupCode is null.
 */
export const setGroupCodeToCurrentlyActive = (groupCode) => {
  try {
    if (groupCode === null) {
      localStorage.removeItem("activeGroupCode");
    } else {
      localStorage.setItem("activeGroupCode", groupCode);
      devLog("GroupCode set to active:", groupCode);
    }
    return true;
  } catch (error) {
    devLog("Error setting groupCode to active", error);
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

/**
 * Deletes application data from local storage, including viewState, previousRoute, and nestedPreviousRoute.
 */
export const deleteApplicationDataFromLocalStorage = () => {
  removeViewStateFromLocalStorage();
  deleteRouteFromLocalStorage("previousRoute");
  deleteRouteFromLocalStorage("nestedPreviousRoute");
};

/**
 * Deletes data related to the provided group code from local storage:
 * - Deletes activeGroupCode.
 * - Removes activeGroupCode from the storedGroupCodes array.
 * - Deletes storedGroupCodes array if it becomes empty.
 *
 * @param {string} groupCode - The groupCode identifying the group.
 */
export const deleteGroupDataFromLocalStorage = (groupCode) => {
  removeGroupCodeFromStoredGroupCodes(groupCode);
  removeActiveGroupCodeFromLocalStorage();
};
