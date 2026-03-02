import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLanguageFromLocalStorage } from "./getLanguageFromLocalStorage";
import { getLocalStorageKey } from "./getLocalStorageKey";

jest.mock("./getLocalStorageKey");

describe("getLanguageFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.LANGUAGE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct LANGUAGE key", () => {
    getLanguageFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored language code", () => {
    getLocalStorageKey.mockReturnValue(MOCK_LOCALSTORAGE_VALUES.LANGUAGE);

    const result = getLanguageFromLocalStorage();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.LANGUAGE);
  });

  it("should return null if no language is set", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getLanguageFromLocalStorage();

    expect(result).toBeNull();
  });
});
