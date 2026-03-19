import { useCallback } from "react";
import useApi from "./useApi.js";
import useGroupContext from "../../context/GroupContext.js";

const useGroupApi = (apiService) => {
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

export default useGroupApi;
