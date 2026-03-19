import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import {
  MOCK_DATA,
  MOCK_LOGS,
} from "../../../../shared/constants/test/testConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";
import getLocalStorageKey from "./getLocalStorageKey.js";

jest.mock("../../../../shared/utils/debug/debugLog.js");
jest.mock("./getLocalStorageKey.js");

describe("deleteLocalStorageKey", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true and call localStorage.removeItem if the key exists", () => {
    getLocalStorageKey.mockReturnValue(MOCK_DATA.STRING);

    const result = deleteLocalStorageKey(mockKey);

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(mockKey);
    expect(result).toBe(true);
  });

  it("should return false and not call localStorage.removeItem if the key does not exist", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = deleteLocalStorageKey(mockKey);

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(window.localStorage.removeItem).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it("should catch errors, log them via debugLog, and return false", () => {
    getLocalStorageKey.mockImplementation(() => {
      throw MOCK_LOGS.MOCK_ERROR;
    });

    const result = deleteLocalStorageKey(mockKey);

    expect(debugLog).toHaveBeenCalledWith(
      `Error deleting key "${mockKey}":`,
      MOCK_LOGS.MOCK_ERROR,
    );
    expect(result).toBe(false);
  });
});
