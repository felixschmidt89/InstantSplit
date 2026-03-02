import { setNestedPreviousRouteInLocalStorage } from "./setNestedPreviousRouteInLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./setLocalStorageKey");

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
