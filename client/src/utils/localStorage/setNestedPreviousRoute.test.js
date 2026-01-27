import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { MOCK_LOCALSTORAGE_VALUES } from "@shared-constants/testConstants";
import { setNestedPreviousRoute } from "./setNestedPreviousRoute";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setNestedPreviousRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the NESTED_PREVIOUS_ROUTE constant and the mock route value", () => {
    const mockRoute = MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE;
    setNestedPreviousRoute(mockRoute);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE,
      mockRoute,
    );
  });

  it("should return the result of setLocalStorageKey", () => {
    setLocalStorageKey.mockReturnValue(true);
    const result = setNestedPreviousRoute(
      MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE,
    );

    expect(result).toBe(true);
  });
});
