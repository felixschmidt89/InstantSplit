import IS_DEVELOPMENT from "../../constants/system/environmentConstants.js";
import LOG_LEVELS from "../../constants/system/loggerConstants.js";

const { INFO, WARN, LOG_ERROR, SUCCESS, DEBUG } = LOG_LEVELS;

const debugLog = (message = "debug", data, level = INFO) => {
  if (!IS_DEVELOPMENT) return;

  const debugMessage = `[${level.toUpperCase()}]: ${message}`;

  if (level === LOG_ERROR || data instanceof Error) {
    console.error(debugMessage, data ?? "");
  } else if (level === WARN) {
    console.warn(debugMessage, data ?? "");
  } else if (level === SUCCESS) {
    console.log(`✅ ${debugMessage}`, data ?? "");
  } else {
    console.log(debugMessage, data ?? "");
  }
};

export default debugLog;
