import { MOCK_DATA } from "@shared-constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

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

  it("should not stringify null values", () => {
    const result = setLocalStorageKey(mockKey, null);

    expect(localStorage.getItem(mockKey)).toBeNull();
    expect(result).toBe(true);
  });

  it("should stringify and store an object value", () => {
    const result = setLocalStorageKey(mockKey, MOCK_DATA.OBJECT);

    expect(localStorage.getItem(mockKey)).toBe(
      JSON.stringify(MOCK_DATA.OBJECT),
    );
    expect(result).toBe(true);
  });
});
