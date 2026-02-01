import { deleteNestedPreviousRoute } from "./deleteNestedPreviousRoute";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./deleteLocalStorageKey");

describe("deleteNestedPreviousRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey with the correct NESTED_PREVIOUS_ROUTE key", () => {
    deleteNestedPreviousRoute();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.NESTED_PREVIOUS_ROUTE,
    );
    expect(deleteLocalStorageKey).toHaveBeenCalledTimes(1);
  });
});
