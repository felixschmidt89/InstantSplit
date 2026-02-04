import { useState } from "react";

import { getActiveGroupCode } from "../utils/localStorage";

import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";

const useTriggerRerender = () => {
  const groupCode = getActiveGroupCode();
  const [rerenderTrigger, setRerenderTrigger] = useState(1);

  const incrementRerenderTrigger = () => {
    debugLog(
      "Incrementing rerender trigger",
      { currentTrigger: rerenderTrigger },
      LOG_LEVELS.INFO,
    );

    setRerenderTrigger((prevValue) => prevValue + 1);
  };

  return {
    groupCode,
    rerenderTrigger,
    incrementRerenderTrigger,
  };
};

export default useTriggerRerender;
