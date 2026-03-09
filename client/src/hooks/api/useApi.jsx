import { useState, useCallback, useRef } from "react";

export const useApi = (apiService) => {
  const [data, setData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRequestLocked = useRef(false);

  const trigger = useCallback(
    async (...argumentList) => {
      if (isRequestLocked.current) return;

      setIsLoading(true);
      isRequestLocked.current = true;

      try {
        const result = await apiService(...argumentList);

        setData(result);
        setIsFetched(true);
        setError(null);

        return result;
      } catch (requestError) {
        setError(requestError);
        setIsFetched(true);
        throw requestError;
      } finally {
        setIsLoading(false);
        isRequestLocked.current = false;
      }
    },
    [apiService],
  );

  return {
    data,
    isFetched,
    isLoading,
    error,
    trigger,
    setData,
  };
};
