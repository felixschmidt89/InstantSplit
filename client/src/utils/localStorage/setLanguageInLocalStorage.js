import LANGUAGES from "../../../../shared/constants/system/languageConstants.js";
import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import setLocalStorageKey from "./setLocalStorageKey.js";

const setLanguageInLocalStorage = (language) => {
  const isSupported = Object.values(LANGUAGES).includes(language);

  if (!isSupported) {
    console.error(`Attempted to set unsupported language: ${language}`);
    return false;
  }

  return setLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE, language);
};

export default setLanguageInLocalStorage;
