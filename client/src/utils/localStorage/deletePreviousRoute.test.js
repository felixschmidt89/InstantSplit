import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { deletePreviousRoute } from "./deletePreviousRoute";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

jest.mock("./deleteLocalStorageKey");

describe("deletePreviousRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey with the correct PREVIOUS_ROUTE key", () => {
    deletePreviousRoute();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.PREVIOUS_ROUTE,
    );
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(1);
  });
});
