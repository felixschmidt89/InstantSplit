import { useCallback } from "react";
import { useApi } from "./useApi";
import { useGroupContext } from "../../context/GroupContext";

export const useGroupApi = (apiService) => {
  const { activeGroupCode } = useGroupContext();

  const { trigger: baseTrigger, ...apiState } = useApi(apiService);

  const trigger = useCallback(
    async (...args) => {
      return await baseTrigger(activeGroupCode, ...args);
    },
    [baseTrigger, activeGroupCode],
  );

  return { ...apiState, trigger };
};
