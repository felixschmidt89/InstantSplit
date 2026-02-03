import { useEffect, useRef } from "react";
import { POLLING_INTERVAL_MS } from "../../../shared/constants/applicationConstants.js";

export const usePolling = (callback, intervalMs = POLLING_INTERVAL_MS) => {
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
