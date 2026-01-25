import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import {
  VIEW_TYPES,
  LEGACY_VIEW_MAPPING,
} from "@client-constants/viewConstants";
import { getView } from "./getView";
import { getLocalStorageKey } from "./getLocalStorageKey";

jest.mock("./getLocalStorageKey");

describe("getView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the new value using VIEW_TYPES", () => {
    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return VIEW_TYPES.HISTORY;
      return null;
    });

    const result = getView();

    expect(result).toBe(VIEW_TYPES.HISTORY);
    expect(getLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
  });

  it("should return the legacy value from the mapping keys", () => {
    const legacyKey = Object.keys(LEGACY_VIEW_MAPPING)[0];

    getLocalStorageKey.mockImplementation((key) => {
      if (key === LOCAL_STORAGE_KEYS.VIEW) return null;
      if (key === LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY) return legacyKey;
      return null;
    });

    const result = getView();

    expect(result).toBe(legacyKey);
    expect(getLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
    expect(getLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY,
    );
  });
});
