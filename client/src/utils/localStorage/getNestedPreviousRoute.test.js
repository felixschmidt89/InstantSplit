import { getNestedPreviousRoute } from "./getNestedPreviousRoute";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";

jest.mock("./getLocalStorageKey");

describe("getNestedPreviousRoute", () => {
  const mockKey = LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct NESTED_PREVIOUS_ROUTE key", () => {
    getNestedPreviousRoute();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored nested route string", () => {
    getLocalStorageKey.mockReturnValue(
      MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE,
    );

    const result = getNestedPreviousRoute();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.NESTED_PREVIOUS_ROUTE);
  });

  it("should return null if no nested route is stored", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getNestedPreviousRoute();

    expect(result).toBeNull();
  });
});
