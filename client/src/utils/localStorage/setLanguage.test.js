import { MOCK_DATA } from "@shared-constants/testConstants";
import { LANGUAGES } from "@shared-constants/languageConstants";
import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { setLanguage } from "./setLanguage";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setLanguage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the correct constant for German", () => {
    setLanguage(LANGUAGES.GERMAN);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LANGUAGE,
      LANGUAGES.GERMAN,
    );
  });

  it("should call setLocalStorageKey with the correct constant for English", () => {
    setLanguage(LANGUAGES.ENGLISH);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LANGUAGE,
      LANGUAGES.ENGLISH,
    );
  });

  it("should return false and not call storage if an invalid language is provided", () => {
    const result = setLanguage(MOCK_DATA.STRING);

    expect(result).toBe(false);
    expect(setLocalStorageKey).not.toHaveBeenCalled();
  });
});
