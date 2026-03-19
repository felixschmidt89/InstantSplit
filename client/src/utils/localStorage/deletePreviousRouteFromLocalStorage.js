import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import deleteLocalStorageKey from "./deleteLocalStorageKey.js";

const deletePreviousRouteFromLocalStorage = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
};

export default deletePreviousRouteFromLocalStorage;
