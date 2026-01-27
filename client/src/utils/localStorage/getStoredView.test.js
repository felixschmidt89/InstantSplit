import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { VIEW_TYPES, LEGACY_VIEW_TYPES } from "@client-constants/viewConstants";
import { getStoredView } from "./getStoredView.js";
import { getLocalStorageKey } from "./getLocalStorageKey.js";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey.js";

jest.mock("./getLocalStorageKey");
jest.mock("./deleteLocalStorageKey");

describe("getStoredView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the value from the primary 'VIEW' key", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.HISTORY;
      return null;
    });

    const result = getStoredView();

    expect(result).toBe(VIEW_TYPES.HISTORY);
    expect(getLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
  });

  it("should return the legacy value when the primary key is empty", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return null;
      if (key === LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY)
        return LEGACY_VIEW_TYPES.VIEW_1;
      return null;
    });

    const result = getStoredView();

    expect(result).toBe(LEGACY_VIEW_TYPES.VIEW_1);
    expect(getLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
    expect(getLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY,
    );
  });

  it("should prioritize the primary key and trigger the removal of the legacy key entry", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.BALANCES;
      if (key === LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY)
        return LEGACY_VIEW_TYPES.VIEW_2;
      return null;
    });

    const result = getStoredView();

    expect(result).toBe(VIEW_TYPES.BALANCES);
    expect(deleteLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY,
    );
  });

  it("should not attempt to delete the legacy key if the entry does not exist", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.BALANCES;
      if (key === LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY) return null;
      return null;
    });

    getStoredView();

    expect(deleteLocalStorageKey).not.toHaveBeenCalled();
  });
});
