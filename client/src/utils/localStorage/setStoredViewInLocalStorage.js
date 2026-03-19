import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import setLocalStorageKey from "./setLocalStorageKey.js";

const setStoredViewInLocalStorage = (value) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW, value);
};

export default setStoredViewInLocalStorage;
