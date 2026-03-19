import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import {
  MOCK_DATA,
  MOCK_ERROR_MESSAGES,
} from "../../../../shared/constants/test/testConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";
import setLocalStorageKey from "./setLocalStorageKey.js";

jest.mock("./deleteLocalStorageKey.js");
jest.mock("../../../../shared/utils/debug/debugLog.js");

describe("setLocalStorageKey", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should store a string value directly", () => {
    const result = setLocalStorageKey(mockKey, MOCK_DATA.STRING);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      mockKey,
      MOCK_DATA.STRING,
    );
    expect(result).toBe(true);
  });

  it("should delegate to deleteLocalStorageKey when value is null", () => {
    deleteLocalStorageKey.mockReturnValue(true);

    const result = setLocalStorageKey(mockKey, null);

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(result).toBe(true);
  });

  it("should stringify and store an object value", () => {
    const result = setLocalStorageKey(mockKey, MOCK_DATA.OBJECT);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      mockKey,
      JSON.stringify(MOCK_DATA.OBJECT),
    );
    expect(result).toBe(true);
  });

  it("should return false and log error on exception", () => {
    window.localStorage.setItem.mockImplementationOnce(() => {
      throw new Error(MOCK_ERROR_MESSAGES.STORAGE_FULL);
    });

    const result = setLocalStorageKey(mockKey, MOCK_DATA.STRING);

    expect(result).toBe(false);
    expect(debugLog).toHaveBeenCalledWith(
      expect.stringContaining(`Error setting key "${mockKey}"`),
      expect.any(Error),
    );
  });
});
