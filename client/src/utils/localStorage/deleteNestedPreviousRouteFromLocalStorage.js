import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";

const deleteNestedPreviousRouteFromLocalStorage = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);
};

export default deleteNestedPreviousRouteFromLocalStorage;
