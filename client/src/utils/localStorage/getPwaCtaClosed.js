import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLocalStorageKey } from "./getLocalStorageKey";

export const getPwaCtaClosed = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED);
