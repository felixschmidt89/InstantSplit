import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import setLocalStorageKey from "./setLocalStorageKey.js";

const setPwaCtaClosedInLocalStorage = () => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED, Date.now());
};

export default setPwaCtaClosedInLocalStorage;
