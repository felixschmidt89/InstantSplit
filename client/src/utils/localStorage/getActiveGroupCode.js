import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getActiveGroupCode = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
