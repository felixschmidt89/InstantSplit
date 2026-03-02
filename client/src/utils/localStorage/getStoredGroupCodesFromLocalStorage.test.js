import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { debugLog } from "../../../../shared/utils/debug";
import {
  MOCK_DATA,
  MOCK_LOCALSTORAGE_VALUES,
} from "../../../../shared/constants/testConstants";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";

const { LOG_ERROR } = LOG_LEVELS;

jest.mock("./getLocalStorageKey");
jest.mock("../../../../shared/utils/debug");

describe("getStoredGroupCodesFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.STORED_GROUP_CODES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array if no codes are stored", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getStoredGroupCodesFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual([]);
  });

  it("should parse and return an array when valid JSON is stored", () => {
    const mockCodes = MOCK_LOCALSTORAGE_VALUES.STORED_GROUP_CODES;
    getLocalStorageKey.mockReturnValue(JSON.stringify(mockCodes));

    const result = getStoredGroupCodesFromLocalStorage();

    expect(result).toEqual(mockCodes);
  });

  it("should return an empty array and log an error if JSON parsing fails", () => {
    getLocalStorageKey.mockReturnValue(MOCK_DATA.STRING);

    const result = getStoredGroupCodesFromLocalStorage();

    expect(result).toEqual([]);
    expect(debugLog).toHaveBeenCalledWith(
      "Error parsing storedGroupCodes from local storage:",
      { error: expect.any(String) },
      LOG_ERROR,
    );
  });
});
