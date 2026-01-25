import { MOCK_DATA } from "@shared-constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

jest.mock("./deleteLocalStorageKey");
jest.mock("@client-utils/debug/debugLog");

describe("setLocalStorageKey", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should store a string value directly", () => {
    const result = setLocalStorageKey(mockKey, MOCK_DATA.STRING);

    expect(localStorage.getItem(mockKey)).toBe(MOCK_DATA.STRING);
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

    expect(localStorage.getItem(mockKey)).toBe(
      JSON.stringify(MOCK_DATA.OBJECT),
    );
    expect(result).toBe(true);
  });

  it("should return false and log error on exception", () => {
    const setItemSpy = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("Storage Full");
      });

    const result = setLocalStorageKey(mockKey, MOCK_DATA.STRING);

    expect(result).toBe(false);
    expect(debugLog).toHaveBeenCalledWith(
      expect.stringContaining("Error setting key"),
      expect.any(Error),
    );

    setItemSpy.mockRestore();
  });
});
