import {
  MOCK_DATA,
  MOCK_LOCALSTORAGE_VALUES,
} from "@shared-constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

jest.mock("./getLocalStorageKey");
jest.mock("@client-utils/debug/debugLog");

describe("getStoredGroupCodes", () => {
  const mockKey = LOCAL_STORAGE_KEYS.STORED_GROUP_CODES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array if no codes are stored", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getStoredGroupCodes();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual([]);
  });

  it("should parse and return an array when valid JSON is stored", () => {
    const mockCodes = MOCK_LOCALSTORAGE_VALUES.STORED_GROUP_CODES;
    getLocalStorageKey.mockReturnValue(JSON.stringify(mockCodes));

    const result = getStoredGroupCodes();

    expect(result).toEqual(mockCodes);
  });

  it("should return an empty array and log an error if JSON parsing fails", () => {
    getLocalStorageKey.mockReturnValue(MOCK_DATA.STRING);

    const result = getStoredGroupCodes();

    expect(result).toEqual([]);
    expect(debugLog).toHaveBeenCalledWith(
      "Error parsing storedGroupCodes from local storage:",
      expect.any(Error),
    );
  });
});
