import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setPwaCtaClosedInLocalStorage = () => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED, Date.now());
};
