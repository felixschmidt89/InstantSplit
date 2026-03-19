import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { MOCK_DATA } from "../../../../shared/constants/test/testConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";

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
    getLocalStorageKey.mockReturnValue(JSON.stringify(MOCK_DATA.ARRAY));

    const result = getStoredGroupCodesFromLocalStorage();

    expect(result).toEqual(MOCK_DATA.ARRAY);
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
