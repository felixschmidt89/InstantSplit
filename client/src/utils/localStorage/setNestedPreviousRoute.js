import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setNestedPreviousRoute = (route) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE, route);
};
