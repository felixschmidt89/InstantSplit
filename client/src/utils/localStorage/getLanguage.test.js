import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { getLanguage } from "./getLanguage";
import { getLocalStorageKey } from "./getLocalStorageKey";

jest.mock("./getLocalStorageKey");

describe("getLanguage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.LANGUAGE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct LANGUAGE key", () => {
    getLanguage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored language code", () => {
    getLocalStorageKey.mockReturnValue(MOCK_LOCALSTORAGE_VALUES.LANGUAGE);

    const result = getLanguage();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.LANGUAGE);
  });

  it("should return null if no language is set", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getLanguage();

    expect(result).toBeNull();
  });
});
