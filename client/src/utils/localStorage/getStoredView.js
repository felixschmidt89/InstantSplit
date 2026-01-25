import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getStoredView = () => {
  return (
    getLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW) ||
    getLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY)
  );
};
