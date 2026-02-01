import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { deleteActiveGroupCode } from "./deleteActiveGroupCode";
import { deleteLocalStorageKey } from "./deleteLocalStorageKey";

jest.mock("./deleteLocalStorageKey");

describe("deleteActiveGroupCode", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey with the correct ACTIVE_GROUP_CODE key", () => {
    deleteActiveGroupCode();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return true when deletion is successful", () => {
    deleteLocalStorageKey.mockReturnValue(true);

    const result = deleteActiveGroupCode();

    expect(result).toBe(true);
  });

  it("should return false when deletion fails or key doesn't exist", () => {
    deleteLocalStorageKey.mockReturnValue(false);

    const result = deleteActiveGroupCode();

    expect(result).toBe(false);
  });
});
