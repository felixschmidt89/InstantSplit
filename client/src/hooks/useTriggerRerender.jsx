import { useState } from "react";
import { getActiveGroupCode } from "../utils/localStorage";
import { debugLog } from "../../../shared/utils/debug";

const useTriggerRerender = () => {
  const groupCode = getActiveGroupCode();

  const [rerenderTrigger, setRerenderTrigger] = useState(1);

  const incrementRerenderTrigger = () => {
    setRerenderTrigger((prevValue) => prevValue + 1);
    debugLog("Rerender trigger incremented:", rerenderTrigger);
  };

  return {
    groupCode,
    rerenderTrigger,
    incrementRerenderTrigger,
  };
};

export default useTriggerRerender;
