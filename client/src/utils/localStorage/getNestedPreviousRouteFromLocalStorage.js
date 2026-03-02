import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getNestedPreviousRouteFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);
