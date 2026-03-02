import { deleteStoredViewFromLocalStorage } from "./deleteStoredViewFromLocalStorage";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./deleteLocalStorageKey");

describe("deleteStoredViewFromLocalStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey for both view keys", () => {
    deleteStoredViewFromLocalStorage();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
    expect(deleteLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY,
    );
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(2);
  });
});
