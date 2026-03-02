import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deleteNestedPreviousRouteFromLocalStorage = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);
};
