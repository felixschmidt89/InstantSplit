import { useState } from "react";

import { devLog } from "@client-utils/errorUtils";
import { getActiveGroupCode } from "@/utils/localStorage/index.js";

const useTriggerRerender = () => {
  const groupCode = getActiveGroupCode();

  const [rerenderTrigger, setRerenderTrigger] = useState(1);

  const incrementRerenderTrigger = () => {
    setRerenderTrigger((prevValue) => prevValue + 1);
    devLog("Rerender trigger incremented:", rerenderTrigger);
  };

  return {
    groupCode,
    rerenderTrigger,
    incrementRerenderTrigger,
  };
};

export default useTriggerRerender;
