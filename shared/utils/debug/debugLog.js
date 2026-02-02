import { LOG_LEVELS } from "../../constants/debugConstants.js";

export const debugLog = (message = "debug", data, level = LOG_LEVELS.INFO) => {
  const isDevelopment =
    (typeof process !== "undefined" &&
      process.env.NODE_ENV === "development") ||
    (typeof window !== "undefined" &&
      (window.location?.hostname === "localhost" ||
        window.location?.hostname === "127.0.0.1"));

  if (isDevelopment) {
    const debugMessage = `${level}: ${message}`;

    if (data !== undefined) {
      if (data instanceof Error || level === LOG_LEVELS.ERROR) {
        console.error(debugMessage, data);
      } else {
        console.log(debugMessage, data);
      }
    } else {
      console.log(debugMessage);
    }
  }
};
