import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";

export const setPreviousRoute = (route) => {
  return setLocalStorageKey(LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE, route);
};
