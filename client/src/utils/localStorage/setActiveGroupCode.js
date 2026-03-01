import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

// TODO: Update name to include local storage for clarity, e.g. setActiveGroupCodeInLocalStorage
export const setActiveGroupCode = (groupCode) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE, groupCode);
};
