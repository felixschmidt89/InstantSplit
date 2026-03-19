import LOCAL_STORAGE_KEYS from "../../constants/localStorageConstants.js";

import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants.js";
import getStoredGroupCodesFromLocalStorage from "./getStoredGroupCodesFromLocalStorage.js";
import setLocalStorageKey from "./setLocalStorageKey.js";
import storeGroupCodeInLocalStorage from "./storeGroupCodeInLocalStorage.js";

jest.mock("./getStoredGroupCodesFromLocalStorage.js");
jest.mock("./setLocalStorageKey.js");

describe("storeGroupCodeInLocalStorage", () => {
  const { ACTIVE_GROUP_CODE, STORED_GROUP_CODES, NEW_TEST_GROUP_CODE } =
    MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new group code if it is not already present", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue([]);
    setLocalStorageKey.mockReturnValue(true);

    const result = storeGroupCodeInLocalStorage(ACTIVE_GROUP_CODE);

    expect(result).toBe(true);
    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [ACTIVE_GROUP_CODE],
    );
  });

  it("should not add the code if it already exists in the stored array", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue(STORED_GROUP_CODES);

    const result = storeGroupCodeInLocalStorage(ACTIVE_GROUP_CODE);

    expect(result).toBe(true);
    expect(setLocalStorageKey).not.toHaveBeenCalled();
  });

  it("should append a unique code to the existing list", () => {
    getStoredGroupCodesFromLocalStorage.mockReturnValue([ACTIVE_GROUP_CODE]);
    setLocalStorageKey.mockReturnValue(true);

    storeGroupCodeInLocalStorage(NEW_TEST_GROUP_CODE);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [ACTIVE_GROUP_CODE, NEW_TEST_GROUP_CODE],
    );
  });
});
