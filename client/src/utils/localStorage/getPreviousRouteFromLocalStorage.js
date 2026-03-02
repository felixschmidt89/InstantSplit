import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getPreviousRouteFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
