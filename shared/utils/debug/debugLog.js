import { LOG_LEVELS, LOG_SOURCES } from "../../constants/debugConstants.js";

export const debugLog = (
  message = "debug",
  data,
  level = LOG_LEVELS.INFO,
  source = null,
) => {
  const isDevelopment =
    (typeof process !== "undefined" &&
      process.env.NODE_ENV === "development") ||
    (typeof window !== "undefined" &&
      (window.location?.hostname === "localhost" ||
        window.location?.hostname === "127.0.0.1"));

  if (isDevelopment) {
    const sourceTag = source ? `[${source.toUpperCase()}] ` : "";
    const fullMessage = `${sourceTag}${level.toUpperCase()}: ${message}`;

    if (data !== undefined) {
      if (data instanceof Error || level === LOG_LEVELS.ERROR) {
        console.error(fullMessage, data);
      } else {
        console.log(fullMessage, data);
      }
    } else {
      console.log(fullMessage);
    }
  }
};
