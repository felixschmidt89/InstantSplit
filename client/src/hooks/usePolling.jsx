import { useEffect, useRef } from "react";
import SYSTEM from "../../../shared/constants/system/systemConstants.js";

const { POLLING_INTERVAL } = SYSTEM;

const usePolling = (callback, intervalMs = POLLING_INTERVAL) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedCallback.current(false);

    const id = setInterval(() => {
      savedCallback.current(true);
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs]);
};

export default usePolling;
