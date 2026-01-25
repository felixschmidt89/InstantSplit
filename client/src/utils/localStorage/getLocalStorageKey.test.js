import { getLocalStorageKey } from "./getLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

jest.mock("@client-utils/debug/debugLog");

describe("getLocalStorageKey", () => {
  const mockKey = "test-key";
  const mockValue = "test-value";

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should return the value when the key exists", () => {
    localStorage.setItem(mockKey, mockValue);

    const result = getLocalStorageKey(mockKey);

    expect(result).toBe(mockValue);
    expect(debugLog).not.toHaveBeenCalled();
  });

  it("should return null and log a message when the key does not exist", () => {
    const result = getLocalStorageKey(mockKey);

    expect(result).toBeNull();
    expect(debugLog).toHaveBeenCalledWith(
      `Local storage key "${mockKey}" is empty/null.`,
    );
  });

  it("should return null and log an error when localStorage throws an exception", () => {
    const mockError = new Error("Access Denied");
    const getItemSpy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw mockError;
      });

    const result = getLocalStorageKey(mockKey);

    expect(result).toBeNull();
    expect(debugLog).toHaveBeenCalledWith(
      `Error accessing local storage key "${mockKey}":`,
      mockError,
    );

    getItemSpy.mockRestore();
  });
});
