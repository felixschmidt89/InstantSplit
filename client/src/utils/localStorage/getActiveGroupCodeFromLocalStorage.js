import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import getLocalStorageKey from "./getLocalStorageKey.js";

const getActiveGroupCodeFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);

export default getActiveGroupCodeFromLocalStorage;
