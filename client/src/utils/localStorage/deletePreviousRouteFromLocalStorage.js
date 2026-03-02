import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deletePreviousRouteFromLocalStorage = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
};
