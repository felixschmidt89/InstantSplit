import { setLocalStorageKey } from "./setLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";

jest.mock("@client-utils/debug/debugLog");

describe("setLocalStorageKey", () => {
  const mockKey = "testKey";

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should store a string value directly", () => {
    const value = "stringValue";
    const result = setLocalStorageKey(mockKey, value);

    expect(localStorage.getItem(mockKey)).toBe(value);
    expect(result).toBe(true);
  });

  it("should not stringify null values", () => {
    setLocalStorageKey(mockKey, null);
    expect(localStorage.getItem(mockKey)).toBeNull();
  });

  it("should stringify and store an object value", () => {
    const value = { id: 1 };
    const result = setLocalStorageKey(mockKey, value);

    expect(localStorage.getItem(mockKey)).toBe(JSON.stringify(value));
    expect(result).toBe(true);
  });
});
