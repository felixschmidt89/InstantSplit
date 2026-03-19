import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";

const deleteActiveGroupCodeFromLocalStorage = () => {
  return deleteLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
};

export default deleteActiveGroupCodeFromLocalStorage;
