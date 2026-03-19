import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import getLocalStorageKey from "./getLocalStorageKey.js";
import getPreviousRouteFromLocalStorage from "./getPreviousRouteFromLocalStorage.js";

jest.mock("./getLocalStorageKey.js");

describe("getPreviousRouteFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct PREVIOUS_ROUTE key", () => {
    getPreviousRouteFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored route string", () => {
    getLocalStorageKey.mockReturnValue(MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE);

    const result = getPreviousRouteFromLocalStorage();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE);
  });

  it("should return null if no previous route is found", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getPreviousRouteFromLocalStorage();

    expect(result).toBeNull();
  });
});
