// Constants and Utils
import { currentTimeStamp, twentyFourHours } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

/**
 * Checks if the Web Share API is supported on the user's device.
 *
 * @returns {boolean} - Returns true if the Web Share API is supported, otherwise false.
 */
export const isWebShareAPISupported = () => {
  const isSupported = navigator.share !== undefined;
  devLog("User's device supports Web Share API:", isSupported);
  return isSupported;
};
