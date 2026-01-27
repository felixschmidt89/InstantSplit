import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deleteNestedPreviousRoute = () => {
  deleteLocalStorageKey(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);
};
