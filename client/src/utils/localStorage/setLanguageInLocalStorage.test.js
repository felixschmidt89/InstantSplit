import { LANGUAGES } from "../../../../shared/constants/system/languageConstants";
import { MOCK_DATA } from "../../../../shared/constants/test/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setLanguageInLocalStorage } from "./setLanguageInLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setLanguageInLocalStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the correct constant for German", () => {
    setLanguageInLocalStorage(LANGUAGES.GERMAN);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LANGUAGE,
      LANGUAGES.GERMAN,
    );
  });

  it("should call setLocalStorageKey with the correct constant for English", () => {
    setLanguageInLocalStorage(LANGUAGES.ENGLISH);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LANGUAGE,
      LANGUAGES.ENGLISH,
    );
  });

  it("should return false and not call storage if an invalid language is provided", () => {
    const result = setLanguageInLocalStorage(MOCK_DATA.STRING);

    expect(result).toBe(false);
    expect(setLocalStorageKey).not.toHaveBeenCalled();
  });
});
