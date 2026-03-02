import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setActiveGroupCodeInLocalStorage = (groupCode) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE, groupCode);
};
