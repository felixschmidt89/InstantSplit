import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getActiveGroupCodeFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
