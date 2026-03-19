import IS_DEVELOPMENT from "../../constants/system/environmentConstants.js";
import LOG_LEVELS from "../../constants/system/loggerConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;

const debugLog = (message = "debug", data, level = INFO) => {
  if (!IS_DEVELOPMENT) return;

  const debugMessage = `${level}: ${message}`;

  if (data !== undefined) {
    const isErrorState = data instanceof Error || level === LOG_ERROR;

    if (isErrorState) {
      console.error(debugMessage, data);
    } else {
      console.log(debugMessage, data);
    }
  } else {
    console.log(debugMessage);
  }
};

export default debugLog;
