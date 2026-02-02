import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getPreviousRoute = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
