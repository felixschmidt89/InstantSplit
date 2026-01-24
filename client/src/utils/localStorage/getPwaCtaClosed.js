import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";

export const getPwaCtaClosed = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED);
