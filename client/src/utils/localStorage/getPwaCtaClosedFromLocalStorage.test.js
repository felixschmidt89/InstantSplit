import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import getLocalStorageKey from "./getLocalStorageKey.js";
import getPwaCtaClosedFromLocalStorage from "./getPwaCtaClosedFromLocalStorage.js";

jest.mock("./getLocalStorageKey.js");

describe("getPwaCtaClosedFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct PWA CTA key", () => {
    getPwaCtaClosedFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the value from localStorage", () => {
    getLocalStorageKey.mockReturnValue("true");

    const result = getPwaCtaClosedFromLocalStorage();

    expect(result).toBe("true");
  });

  it("should return null if the key does not exist", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getPwaCtaClosedFromLocalStorage();

    expect(result).toBeNull();
  });
});
