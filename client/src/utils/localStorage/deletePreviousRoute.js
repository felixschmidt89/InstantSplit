import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deletePreviousRoute = () => {
  deleteLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
};
