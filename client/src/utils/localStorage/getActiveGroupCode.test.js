import { MOCK_LOCALSTORAGE_VALUES } from "@shared-constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getActiveGroupCode } from "./getActiveGroupCode";
import { getLocalStorageKey } from "./getLocalStorageKey";

jest.mock("./getLocalStorageKey");

describe("getActiveGroupCode", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;
  const mockValue = MOCK_LOCALSTORAGE_VALUES.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct ACTIVE_GROUP_CODE key", () => {
    getActiveGroupCode();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the active group code string", () => {
    getLocalStorageKey.mockReturnValue(mockValue);

    const result = getActiveGroupCode();

    expect(result).toBe(mockValue);
  });

  it("should return null if no group code is active", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getActiveGroupCode();

    expect(result).toBeNull();
  });
});
