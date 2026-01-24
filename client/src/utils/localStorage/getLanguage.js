import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";

export const getLanguage = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
