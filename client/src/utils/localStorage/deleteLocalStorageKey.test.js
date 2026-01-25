import { MOCK_DATA } from "@shared-constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

jest.mock("./getLocalStorageKey");
jest.mock("@client-utils/debug/debugLog");

describe("deleteLocalStorageKey", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should delete item and return true if key exists", () => {
    getLocalStorageKey.mockReturnValue(MOCK_DATA.STRING);

    const result = deleteLocalStorageKey(mockKey);

    expect(localStorage.removeItem).toHaveBeenCalledWith(mockKey);
    expect(debugLog).toHaveBeenCalledWith(
      `Key "${mockKey}" successfully deleted from local storage.`,
    );
    expect(result).toBe(true);
  });

  it("should return false and log message if key does not exist", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = deleteLocalStorageKey(mockKey);

    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(debugLog).toHaveBeenCalledWith(
      `Key "${mockKey}" could not be deleted because it does not exist.`,
    );
    expect(result).toBe(false);
  });

  it("should return false and log error if localStorage throws an exception", () => {
    getLocalStorageKey.mockReturnValue(MOCK_DATA.STRING);
    const mockError = new Error("Security Error");

    localStorage.removeItem.mockImplementation(() => {
      throw mockError;
    });

    const result = deleteLocalStorageKey(mockKey);

    expect(debugLog).toHaveBeenCalledWith(
      `Error deleting key "${mockKey}":`,
      mockError,
    );
    expect(result).toBe(false);
  });
});
