import { LANGUAGES } from "../../../../shared/constants/system/languageConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setLanguageInLocalStorage = (language) => {
  const isSupported = Object.values(LANGUAGES).includes(language);

  if (!isSupported) {
    console.error(`Attempted to set unsupported language: ${language}`);
    return false;
  }

  return setLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE, language);
};
