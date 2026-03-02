import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deletePreviousRouteFromLocalStorage } from "./deletePreviousRouteFromLocalStorage";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

jest.mock("./deleteLocalStorageKey");

describe("deletePreviousRouteFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey with the correct PREVIOUS_ROUTE key", () => {
    deletePreviousRouteFromLocalStorage();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(mockKey);
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(1);
  });

  it("should return the result of the deletion operation", () => {
    deleteLocalStorageKey.mockReturnValue(true);

    const result = deletePreviousRouteFromLocalStorage();

    expect(result).toBe(true);
  });
});
