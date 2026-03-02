import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deleteStoredViewFromLocalStorage = () => {
  deleteLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW);
  deleteLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY);
};
