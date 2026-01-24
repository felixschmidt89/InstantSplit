import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";

export const getPreviousRoute = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE);
