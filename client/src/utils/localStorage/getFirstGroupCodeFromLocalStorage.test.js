import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";
import {
  MOCK_ERROR_MESSAGES,
  MOCK_LOCALSTORAGE_VALUES,
} from "../../../../shared/constants/test/testConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import getFirstGroupCodeFromLocalStorage from "./getFirstGroupCodeFromLocalStorage.js";
import getStoredGroupCodesFromLocalStorage from "./getStoredGroupCodesFromLocalStorage.js";

const { LOG_ERROR } = LOG_LEVELS;

jest.mock("../../../../shared/utils/debug/debugLog.js");
jest.mock("./getStoredGroupCodesFromLocalStorage.js");

describe("getFirstGroupCodeFromLocalStorage", () => {
  const { STORED_GROUP_CODES } = MOCK_LOCALSTORAGE_VALUES;
  const { STORAGE_FAILURE } = MOCK_ERROR_MESSAGES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the first group code when the array is populated", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);

    const result = getFirstGroupCodeFromLocalStorage();

    expect(result).toBe(STORED_GROUP_CODES[0]);
  });

  it("should return null when the array is empty", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue([]);

    const result = getFirstGroupCodeFromLocalStorage();

    expect(result).toBeNull();
  });

  it("should log the specific error message and return null when retrieval fails", () => {
    const mockError = new Error(STORAGE_FAILURE);
    getStoredGroupCodesFromLocalStorage.mockImplementation(() => {
      throw mockError;
    });

    const result = getFirstGroupCodeFromLocalStorage();

    expect(result).toBeNull();
    expect(debugLog).toHaveBeenCalledWith(
      "Error retrieving the first groupCode from the storedGroupCodes array:",
      { error: mockError.message },
      LOG_ERROR,
    );
  });
});
