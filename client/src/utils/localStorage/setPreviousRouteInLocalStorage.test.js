import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import setLocalStorageKey from "./setLocalStorageKey.js";
import setPreviousRouteInLocalStorage from "./setPreviousRouteInLocalStorage.js";

jest.mock("./setLocalStorageKey.js");

describe("setPreviousRouteInLocalStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the PREVIOUS_ROUTE constant and the mock route value", () => {
    const mockRoute = MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE;
    setPreviousRouteInLocalStorage(mockRoute);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE,
      mockRoute,
    );
  });

  it("should return the result of setLocalStorageKey", () => {
    setLocalStorageKey.mockReturnValue(true);
    const result = setPreviousRouteInLocalStorage(
      MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE,
    );

    expect(result).toBe(true);
  });
});
