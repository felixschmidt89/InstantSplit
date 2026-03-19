import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import setLocalStorageKey from "./setLocalStorageKey.js";
import setNestedPreviousRouteInLocalStorage from "./setNestedPreviousRouteInLocalStorage.js";

jest.mock("./setLocalStorageKey.js");

describe("setNestedPreviousRouteInLocalStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the NESTED_PREVIOUS_ROUTE constant and the mock route value", () => {
    const mockRoute = MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE;
    setNestedPreviousRouteInLocalStorage(mockRoute);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE,
      mockRoute,
    );
  });

  it("should return the result of setLocalStorageKey", () => {
    setLocalStorageKey.mockReturnValue(true);
    const result = setNestedPreviousRouteInLocalStorage(
      MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE,
    );

    expect(result).toBe(true);
  });
});
