import { MOCK_LOCALSTORAGE_VALUES } from "@shared-constants/testConstants";
import { isGroupCodeInStoredGroupCodes } from "./isGroupCodeInStoredGroupCodes";
import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { devLog } from "@client-utils/errorUtils";

jest.mock("./getStoredGroupCodes");
jest.mock("@client-utils/errorUtils");

describe("isGroupCodeInStoredGroupCodes", () => {
  const { STORED_GROUP_CODES, NEW_TEST_GROUP_CODE } = MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if the group code exists in the stored array", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);

    const result = isGroupCodeInStoredGroupCodes(STORED_GROUP_CODES[0]);

    expect(result).toBe(true);
  });

  it("should return false if the group code does not exist in the stored array", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);

    const result = isGroupCodeInStoredGroupCodes(NEW_TEST_GROUP_CODE);

    expect(result).toBe(false);
  });

  it("should return false and log the error when retrieval fails", () => {
    const mockError = new Error("Storage failure");
    getStoredGroupCodes.mockImplementation(() => {
      throw mockError;
    });

    const result = isGroupCodeInStoredGroupCodes(STORED_GROUP_CODES[0]);

    expect(result).toBe(false);
    expect(devLog).toHaveBeenCalledWith(
      "Error checking if groupCode is in storedGroupCodes:",
      mockError,
    );
  });
});
