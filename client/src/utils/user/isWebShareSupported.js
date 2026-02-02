import { devLog } from "@client-utils/errorUtils";

export const isWebShareSupported = () => {
  const isSupported = !!navigator.share;

  devLog("Web Share API supported:", isSupported);

  return isSupported;
};
