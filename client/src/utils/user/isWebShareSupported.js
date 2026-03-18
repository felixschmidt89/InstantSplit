import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

export const isWebShareSupported = () => {
  const isSupported = !!navigator.share;

  debugLog("Web Share API supported:", isSupported);

  return isSupported;
};
