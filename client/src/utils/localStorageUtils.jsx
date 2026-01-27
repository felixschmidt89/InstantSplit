import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageConstants";
import { currentTimeStamp } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

// TODO: Drop Local Storage from function names
// TODO:  Atomize local storage utility functions

// TODO: Delete, use existing deleteActiveGroupCode.js instead

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
