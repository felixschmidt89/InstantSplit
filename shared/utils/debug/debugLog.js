import { LOG_LEVELS } from "../../constants/debugConstants.js";

// TODO: add to trace script

export const debugLog = (message = "debug", data, level = LOG_LEVELS.INFO) => {
  // TODO: move elsewhere
  const isDevelopment =
    (typeof process !== "undefined" &&
      process.env.NODE_ENV === "development") ||
    (typeof window !== "undefined" &&
      (window.location?.hostname === "localhost" ||
        window.location?.hostname === "127.0.0.1"));

  if (isDevelopment) {
    const debugMessage = `${level}: ${message}`;

    if (data !== undefined) {
      if (
        data instanceof Error ||
        level === LOG_LEVELS.ERROR ||
        level === LOG_LEVELS.LOG_ERROR
      ) {
        console.error(debugMessage, data);
      } else {
        console.log(debugMessage, data);
      }
    } else {
      console.log(debugMessage);
    }
  }
};

export const INFO = LOG_LEVELS.INFO;
export const DEBUG = LOG_LEVELS.DEBUG;
export const WARN = LOG_LEVELS.WARN;
export const ERROR = LOG_LEVELS.LOG_ERROR;
