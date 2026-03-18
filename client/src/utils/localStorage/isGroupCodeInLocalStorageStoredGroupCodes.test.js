import { isGroupCodeInLocalStorageStoredGroupCodes } from "./isGroupCodeInLocalStorageStoredGroupCodes.js";
import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";

const { LOG_ERROR } = LOG_LEVELS;

jest.mock("./getStoredGroupCodesFromLocalStorage.js");
jest.mock("../../../../shared/utils/debug/debugLog.js", () => ({
  debugLog: jest.fn(),
}));

describe("isGroupCodeInLocalStorageStoredGroupCodes", () => {
  const { STORED_GROUP_CODES, NEW_TEST_GROUP_CODE } = MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if the group code exists in the stored array", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);
    const result = isGroupCodeInLocalStorageStoredGroupCodes(
      STORED_GROUP_CODES[0],
    );
    expect(result).toBe(true);
  });

  it("should return false if the group code does not exist in the stored array", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);
    const result =
      isGroupCodeInLocalStorageStoredGroupCodes(NEW_TEST_GROUP_CODE);
    expect(result).toBe(false);
  });

  it("should return false and log the error when retrieval fails", () => {
    const mockError = new Error("Storage failure");
    getStoredGroupCodesFromLocalStorage.mockImplementation(() => {
      throw mockError;
    });

    const result = isGroupCodeInLocalStorageStoredGroupCodes(
      STORED_GROUP_CODES[0],
    );

    expect(result).toBe(false);
    expect(debugLog).toHaveBeenCalledWith(
      "Error checking if groupCode is in storedGroupCodes:",
      { error: mockError.message },
      LOG_ERROR,
    );
  });
});
