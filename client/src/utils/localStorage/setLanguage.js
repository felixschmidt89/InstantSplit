import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { devLog } from "../errorUtils";

export const setLanguage = (language) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, language);
    devLog("Language updated in local storage:", language);
    return true;
  } catch (error) {
    devLog("Error setting language in local storage:", error);
    return false;
  }
};
