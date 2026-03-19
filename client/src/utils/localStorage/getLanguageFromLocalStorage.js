import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import getLocalStorageKey from "./getLocalStorageKey.js";

const getLanguageFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.LANGUAGE);

export default getLanguageFromLocalStorage;
