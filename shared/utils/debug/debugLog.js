import IS_DEVELOPMENT from "../../constants/system/environmentConstants.js";
import LOG_LEVELS from "../../constants/system/loggerConstants.js";

const { INFO, WARN, LOG_ERROR, SUCCESS } = LOG_LEVELS;

const debugLog = (message = "debug", data = null, level = INFO) => {
  if (!IS_DEVELOPMENT) return;

  const debugMessage = `[${level.toUpperCase()}]: ${message}`;

  const isErrorState = level === LOG_ERROR || data instanceof Error;

  if (isErrorState) {
    console.error(debugMessage, data ?? "");
    return;
  }

  if (level === WARN) {
    console.warn(debugMessage, data ?? "");
    return;
  }

  if (level === SUCCESS) {
    console.log(`✅ ${debugMessage}`, data ?? "");
    return;
  }

  console.log(debugMessage, data ?? "");
};

export default debugLog;
