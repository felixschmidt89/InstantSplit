import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { VIEW_TYPES, LEGACY_VIEW_TYPES } from "@client-constants/viewConstants";
import { getStoredView } from "./getStoredView.js";
import { getLocalStorageKey } from "./getLocalStorageKey.js";

jest.mock("./getLocalStorageKey");

describe("getStoredView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the modern value using VIEW_TYPES (e.g., history)", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.HISTORY;
      return null;
    });

    const result = getStoredView();

    expect(result).toBe(VIEW_TYPES.HISTORY);
    expect(getLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
  });

  it("should return the legacy value when modern key is empty", () => {
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

  it("should prioritize modern VIEW over LEGACY_VIEW_TYPES", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.BALANCES;
      if (key === LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY)
        return LEGACY_VIEW_TYPES.VIEW_2;
      return null;
    });

    const result = getStoredView();

    expect(result).toBe(VIEW_TYPES.BALANCES);
  });
});
