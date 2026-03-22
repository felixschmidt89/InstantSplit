import { useCallback } from "react";
import useApi from "./useApi.jsx";
import { useGroupContext } from "../../context/GroupContext.jsx";

const useGroupApi = (apiService) => {
  const { activeGroupCode } = useGroupContext();

  const { trigger: baseTrigger, ...apiState } = useApi(apiService);

  const trigger = useCallback(
    async (...args) => {
      if (!activeGroupCode) return;
      return await baseTrigger(activeGroupCode, ...args);
    },
    [baseTrigger, activeGroupCode],
  );

  return {
    ...apiState,
    trigger,
  };
};

export default useGroupApi;
