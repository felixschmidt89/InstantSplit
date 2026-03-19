import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import deleteLocalStorageKey from "./deleteLocalStorageKey.js";
import deletePreviousRouteFromLocalStorage from "./deletePreviousRouteFromLocalStorage.js";

jest.mock("./deleteLocalStorageKey.js");

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
