import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import {
  MOCK_DATA,
  MOCK_ERROR_MESSAGES,
} from "../../../../shared/constants/test/testConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

jest.mock("../../../../shared/utils/debug/debugLog.js");

describe("getLocalStorageKey", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the value when the key exists", () => {
    window.localStorage.getItem.mockReturnValue(MOCK_DATA.STRING);

    const result = getLocalStorageKey(mockKey);

    expect(result).toBe(MOCK_DATA.STRING);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(debugLog).not.toHaveBeenCalled();
  });

  it("should return null and not log a message when the key does not exist", () => {
    window.localStorage.getItem.mockReturnValue(null);

    const result = getLocalStorageKey(mockKey);

    expect(result).toBeNull();
    expect(debugLog).not.toHaveBeenCalled();
  });

  it("should return null and log an error when localStorage throws an exception", () => {
    const mockError = new Error(MOCK_ERROR_MESSAGES.ACCESS_DENIED);
    window.localStorage.getItem.mockImplementationOnce(() => {
      throw mockError;
    });

    const result = getLocalStorageKey(mockKey);

    expect(result).toBeNull();
    expect(debugLog).toHaveBeenCalledWith(
      `Error accessing local storage key "${mockKey}":`,
      mockError,
    );
  });
});
