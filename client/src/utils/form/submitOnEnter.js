import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

export const submitOnEnter = (event, handleFormSubmit) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    debugLog(
      "Enter key pressed - triggering submit",
      { key: event.key },
      LOG_LEVELS.DEBUG,
    );

    handleFormSubmit(event);
  }
};
