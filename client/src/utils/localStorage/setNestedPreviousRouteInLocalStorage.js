import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import setLocalStorageKey from "./setLocalStorageKey.js";

const setNestedPreviousRouteInLocalStorage = (route) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE, route);
};

export default setNestedPreviousRouteInLocalStorage;
