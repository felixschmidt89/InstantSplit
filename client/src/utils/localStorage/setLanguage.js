import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { LANGUAGES } from "@shared-constants/languageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setLanguage = (language) => {
  const isSupported = Object.values(LANGUAGES).includes(language);

  if (!isSupported) {
    console.error(`Attempted to set unsupported language: ${language}`);
    return false;
  }

  return setLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE, language);
};
