import { setPreviousRoute } from "./setPreviousRoute";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./setLocalStorageKey");

describe("setPreviousRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the PREVIOUS_ROUTE constant and the mock route value", () => {
    const mockRoute = MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE;
    setPreviousRoute(mockRoute);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE,
      mockRoute,
    );
  });

  it("should return the result of setLocalStorageKey", () => {
    setLocalStorageKey.mockReturnValue(true);
    const result = setPreviousRoute(MOCK_LOCALSTORAGE_VALUES.PREVIOUS_ROUTE);

    expect(result).toBe(true);
  });
});
