import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

const getPwaCtaClosedFromLocalStorage = () =>
  getLocalStorageKey(LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED);

export default getPwaCtaClosedFromLocalStorage;
