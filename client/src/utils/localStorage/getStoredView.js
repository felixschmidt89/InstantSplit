import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const getStoredView = () => {
  const value = getLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW);
  const legacyValue = getLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY);

  if (value) {
    if (legacyValue) {
      deleteLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY);
    }
    return value;
  }

  return legacyValue || null;
};
