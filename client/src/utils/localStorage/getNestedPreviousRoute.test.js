import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import getLocalStorageKey from "./getLocalStorageKey.js";
import getNestedPreviousRouteFromLocalStorage from "./getNestedPreviousRouteFromLocalStorage.js";

jest.mock("./getLocalStorageKey.js");

describe("getNestedPreviousRouteFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct NESTED_PREVIOUS_ROUTE key", () => {
    getNestedPreviousRouteFromLocalStorage();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored nested route string", () => {
    getLocalStorageKey.mockReturnValue(
      MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE,
    );

    const result = getNestedPreviousRouteFromLocalStorage();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE);
  });

  it("should return null if no nested route is stored", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getNestedPreviousRouteFromLocalStorage();

    expect(result).toBeNull();
  });
});
