import { debugLog } from "../../../../shared/utils/debug";

export const isWebShareSupported = () => {
  const isSupported = !!navigator.share;

  debugLog("Web Share API supported:", isSupported);

  return isSupported;
};
