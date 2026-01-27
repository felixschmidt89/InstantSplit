import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageConstants";
import { currentTimeStamp } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

// TODO: Drop Local Storage from function names
// TODO:  Atomize local storage utility functions

// TODO: Delete, use existing deleteActiveGroupCode.js instead

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
