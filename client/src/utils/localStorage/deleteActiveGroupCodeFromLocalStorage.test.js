import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants.js";
import deleteActiveGroupCodeFromLocalStorage from "./deleteActiveGroupCodeFromLocalStorage.js";
import deleteLocalStorageKey from "./deleteLocalStorageKey.js";

jest.mock("./deleteLocalStorageKey.js");

describe("deleteActiveGroupCodeFromLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteLocalStorageKey with the correct ACTIVE_GROUP_CODE key", () => {
    deleteActiveGroupCodeFromLocalStorage();

    expect(deleteLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return true when deletion is successful", () => {
    deleteLocalStorageKey.mockReturnValue(true);

    const result = deleteActiveGroupCodeFromLocalStorage();

    expect(result).toBe(true);
  });

  it("should return false when deletion fails or key doesn't exist", () => {
    deleteLocalStorageKey.mockReturnValue(false);

    const result = deleteActiveGroupCodeFromLocalStorage();

    expect(result).toBe(false);
  });
});
