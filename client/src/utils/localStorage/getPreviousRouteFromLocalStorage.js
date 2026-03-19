import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import getLocalStorageKey from "./getLocalStorageKey.js";

const getPreviousRouteFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);

export default getPreviousRouteFromLocalStorage;
