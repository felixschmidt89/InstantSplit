import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";

export const getActiveGroupCode = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE);
