import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setActiveGroupCode = (groupCode) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE, groupCode);
};
