import { deleteGroupCode } from "./deleteGroupCode";
import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { getActiveGroupCode } from "./getActiveGroupCode";
import { deleteActiveGroupCode } from "./deleteActiveGroupCode";
import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./getStoredGroupCodes");
jest.mock("./setLocalStorageKey");
jest.mock("./getActiveGroupCode");
jest.mock("./deleteActiveGroupCode");

describe("deleteGroupCode", () => {
  const { STORED_GROUP_CODES, ACTIVE_GROUP_CODE, NEW_TEST_GROUP_CODE } =
    MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove the group code from the stored list and return true", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);
    getActiveGroupCode.mockReturnValue(NEW_TEST_GROUP_CODE);
    setLocalStorageKey.mockReturnValue(true);

    const groupCodeToDelete = STORED_GROUP_CODES[0];
    const result = deleteGroupCode(groupCodeToDelete);

    expect(result).toBe(true);
    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [STORED_GROUP_CODES[1]],
    );
    expect(deleteActiveGroupCode).not.toHaveBeenCalled();
  });

  it("should remove active status if the deleted code is currently active", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);
    getActiveGroupCode.mockReturnValue(ACTIVE_GROUP_CODE);
    setLocalStorageKey.mockReturnValue(true);

    deleteGroupCode(ACTIVE_GROUP_CODE);

    expect(deleteActiveGroupCode).toHaveBeenCalled();
  });

  it("should return false if storage write fails", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);
    setLocalStorageKey.mockReturnValue(false);

    const result = deleteGroupCode(STORED_GROUP_CODES[0]);

    expect(result).toBe(false);
  });
});
