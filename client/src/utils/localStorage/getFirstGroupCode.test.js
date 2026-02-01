import {
  MOCK_ERROR_MESSAGES,
  MOCK_LOCALSTORAGE_VALUES,
} from "../../../../shared/constants/testConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { getFirstGroupCode } from "./getFirstGroupCode.js";
import { getStoredGroupCodes } from "./getStoredGroupCodes.js";

jest.mock("../../../../shared/utils/debug/debugLog.js", () => ({
  debugLog: jest.fn(),
}));

jest.mock("./getStoredGroupCodes");

describe("getFirstGroupCode", () => {
  const { STORED_GROUP_CODES } = MOCK_LOCALSTORAGE_VALUES;
  const { STORAGE_FAILURE } = MOCK_ERROR_MESSAGES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the first group code when the array is populated", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);

    const result = getFirstGroupCode();

    expect(result).toBe(STORED_GROUP_CODES[0]);
  });

  it("should return null when the array is empty", () => {
    getStoredGroupCodes.mockReturnValue([]);

    const result = getFirstGroupCode();

    expect(result).toBeNull();
  });

  it("should log the specific error message and return null when retrieval fails", () => {
    const mockError = new Error(STORAGE_FAILURE);
    getStoredGroupCodes.mockImplementation(() => {
      throw mockError;
    });

    const result = getFirstGroupCode();

    expect(result).toBeNull();
    expect(debugLog).toHaveBeenCalledWith(
      `Error retrieving the first groupCode from the storedGroupCodes array:`,
      mockError,
    );
  });
});
