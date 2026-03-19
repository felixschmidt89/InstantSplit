import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import getLocalStorageKey from "./getLocalStorageKey.js";

const getNestedPreviousRouteFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);

export default getNestedPreviousRouteFromLocalStorage;
