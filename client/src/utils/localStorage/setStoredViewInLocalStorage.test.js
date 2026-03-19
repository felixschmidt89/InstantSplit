import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { VIEW_TYPES } from "../../constants/viewConstants.js";
import setLocalStorageKey from "./setLocalStorageKey.js";
import setStoredViewInLocalStorage from "./setStoredViewInLocalStorage.js";

jest.mock("./setLocalStorageKey.js");

describe("setStoredViewInLocalStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the VIEW key and the modern HISTORY value", () => {
    setStoredViewInLocalStorage(VIEW_TYPES.HISTORY);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW,
      VIEW_TYPES.HISTORY,
    );
  });

  it("should call setLocalStorageKey with the VIEW key and the modern BALANCES value", () => {
    setStoredViewInLocalStorage(VIEW_TYPES.BALANCES);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW,
      VIEW_TYPES.BALANCES,
    );
  });

  it("should return the boolean status from the underlying storage utility", () => {
    setLocalStorageKey.mockReturnValue(true);
    expect(setStoredViewInLocalStorage(VIEW_TYPES.HISTORY)).toBe(true);

    setLocalStorageKey.mockReturnValue(false);
    expect(setStoredViewInLocalStorage(VIEW_TYPES.BALANCES)).toBe(false);
  });
});
