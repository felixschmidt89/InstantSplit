import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setPwaCtaClosed = () => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED, Date.now());
};
