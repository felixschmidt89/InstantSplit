import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import setLocalStorageKey from "./setLocalStorageKey.js";

const setPreviousRouteInLocalStorage = (route) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE, route);
};

export default setPreviousRouteInLocalStorage;
