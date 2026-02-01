import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getLanguage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE);
