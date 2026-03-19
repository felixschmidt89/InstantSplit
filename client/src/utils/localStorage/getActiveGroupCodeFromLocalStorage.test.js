import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import getActiveGroupCodeFromLocalStorage from "./getActiveGroupCodeFromLocalStorage.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

jest.mock("./getLocalStorageKey.js");

describe("getActiveGroupCodeFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;
  const mockValue = MOCK_LOCALSTORAGE_VALUES.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct ACTIVE_GROUP_CODE key", () => {
    getActiveGroupCodeFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the active group code string", () => {
    getLocalStorageKey.mockReturnValue(mockValue);

    const result = getActiveGroupCodeFromLocalStorage();

    expect(result).toBe(mockValue);
  });

  it("should return null if no group code is active", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getActiveGroupCodeFromLocalStorage();

    expect(result).toBeNull();
  });
});
