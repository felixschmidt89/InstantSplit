import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setStoredViewInLocalStorage = (value) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW, value);
};
