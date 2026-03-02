import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getLanguageFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE);
