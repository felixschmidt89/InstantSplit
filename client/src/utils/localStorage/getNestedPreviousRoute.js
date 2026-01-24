import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";

export const getNestedPreviousRoute = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE);
