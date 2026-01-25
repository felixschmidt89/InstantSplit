import {
  MOCK_LOCALSTORAGE_VALUES,
  MOCK_ERROR_MESSAGES,
} from "@shared-constants/testConstants";
import { devLog } from "@client-utils/errorUtils";
import { getFirstGroupCode } from "./getFirstGroupCode";
import { getStoredGroupCodes } from "./getStoredGroupCodes";

jest.mock("./getStoredGroupCodes");
jest.mock("@client-utils/errorUtils");

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
    expect(devLog).toHaveBeenCalledWith(
      `Error retrieving the first groupCode from the storedGroupCodes array:`,
      mockError,
    );
  });
});
