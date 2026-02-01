import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { MOCK_DATA } from "../../../../shared/constants/testConstants";
import { debugLog } from "../../../../shared/utils/debug";

jest.mock("./getLocalStorageKey");
jest.mock("../../../../shared/utils/debug");

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
    getLocalStorageKey.mockReturnValue(JSON.stringify(MOCK_DATA.ARRAY));

    const result = getStoredGroupCodes();

    expect(result).toEqual(MOCK_DATA.ARRAY);
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
