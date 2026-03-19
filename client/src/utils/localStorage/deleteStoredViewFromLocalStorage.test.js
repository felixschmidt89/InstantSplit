import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import deleteLocalStorageKey from "./deleteLocalStorageKey.js";
import deleteStoredViewFromLocalStorage from "./deleteStoredViewFromLocalStorage.js";

jest.mock("./deleteLocalStorageKey.js");

describe("deleteStoredViewFromLocalStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey for the view key", () => {
    deleteStoredViewFromLocalStorage();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(1);
  });
});
