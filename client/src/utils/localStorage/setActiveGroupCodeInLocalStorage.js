import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import setLocalStorageKey from "./setLocalStorageKey.js";

const setActiveGroupCodeInLocalStorage = (groupCode) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE, groupCode);
};

export default setActiveGroupCodeInLocalStorage;
