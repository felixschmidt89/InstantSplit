import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import deleteLocalStorageKey from "./deleteLocalStorageKey.js";

const deleteStoredViewFromLocalStorage = () => {
  deleteLocalStorageKey(LOCAL_STORAGE_KEYS.VIEW);
  // TODO: Delete VIEW STATE LEGACY FUNCTIONALITY. Add script to delete everything, if v1 data is present
};

export default deleteStoredViewFromLocalStorage;
