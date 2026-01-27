import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { deleteStoredView } from "./deleteStoredView";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

jest.mock("./deleteLocalStorageKey");

describe("deleteStoredView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey for both view keys", () => {
    deleteStoredView();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.VIEW);
    expect(deleteLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW_STATE_LEGACY,
    );
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(2);
  });
});
