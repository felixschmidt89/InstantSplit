import { LANGUAGES } from "../../../../shared/constants/system/languageConstants.js";
import { MOCK_DATA } from "../../../../shared/constants/test/testConstants.js";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import setLanguageInLocalStorage from "./setLanguageInLocalStorage.js";
import setLocalStorageKey from "./setLocalStorageKey.js";

jest.mock("./setLocalStorageKey.js");

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
