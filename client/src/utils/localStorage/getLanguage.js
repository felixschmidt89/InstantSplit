import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getLanguage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE);
