import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setStoredView = (value) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW, value);
};
