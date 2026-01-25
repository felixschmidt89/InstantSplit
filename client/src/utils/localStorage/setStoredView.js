import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setStoredView = (value) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW, value);
};
