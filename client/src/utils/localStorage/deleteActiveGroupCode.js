import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

export const deleteActiveGroupCode = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
};
