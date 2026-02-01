import { getPreviousRoute } from "./getPreviousRoute";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";

jest.mock("./getLocalStorageKey");

describe("getPreviousRoute", () => {
  const mockKey = LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct PREVIOUS_ROUTE key", () => {
    getPreviousRoute();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the stored route string", () => {
    getLocalStorageKey.mockReturnValue(MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE);

    const result = getPreviousRoute();

    expect(result).toBe(MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE);
  });

  it("should return null if no previous route is found", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getPreviousRoute();

    expect(result).toBeNull();
  });
});
