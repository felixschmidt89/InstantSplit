import { deleteGroupCodeFromLocalStorage } from "./deleteGroupCodeFromLocalStorage";
import { getStoredGroupCodesFromLocalStorage } from "./getStoredGroupCodesFromLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { getActiveGroupCodeFromLocalStorage } from "./getActiveGroupCodeFromLocalStorage";
import { deleteActiveGroupCodeFromLocalStorage } from "./deleteActiveGroupCodeFromLocalStorage";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./getStoredGroupCodesFromLocalStorage");
jest.mock("./setLocalStorageKey");
jest.mock("./getActiveGroupCodeFromLocalStorage");
jest.mock("./deleteActiveGroupCodeFromLocalStorage");

describe("deleteGroupCodeFromLocalStorage", () => {
  const { STORED_GROUP_CODES, ACTIVE_GROUP_CODE, NEW_TEST_GROUP_CODE } =
    MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove the group code from the stored list and return true", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);
    getActiveGroupCodeFromLocalStorage.mockReturnValue(NEW_TEST_GROUP_CODE);
    setLocalStorageKey.mockReturnValue(true);

    const groupCodeToDelete = STORED_GROUP_CODES[0];
    const result = deleteGroupCodeFromLocalStorage(groupCodeToDelete);

    expect(result).toBe(true);
    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [STORED_GROUP_CODES[1]],
    );
    expect(deleteActiveGroupCodeFromLocalStorage).not.toHaveBeenCalled();
  });

  it("should remove active status if the deleted code is currently active", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);
    getActiveGroupCodeFromLocalStorage.mockReturnValue(ACTIVE_GROUP_CODE);
    setLocalStorageKey.mockReturnValue(true);

    deleteGroupCodeFromLocalStorage(ACTIVE_GROUP_CODE);

    expect(deleteActiveGroupCodeFromLocalStorage).toHaveBeenCalled();
  });

  it("should return false if storage write fails", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);
    setLocalStorageKey.mockReturnValue(false);

    const result = deleteGroupCodeFromLocalStorage(STORED_GROUP_CODES[0]);

    expect(result).toBe(false);
  });
});
