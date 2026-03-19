import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

const getStoredViewFromLocalStorage = () => {
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

export default getStoredViewFromLocalStorage;
