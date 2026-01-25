import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { storeGroupCode } from "./storeGroupCode";
import { getStoredGroupCodes } from "./getStoredGroupCodes";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { debugLog } from "@client-utils/debug/debugLog";
import { MOCK_LOCALSTORAGE_VALUES } from "@shared-constants/testConstants";

jest.mock("./getStoredGroupCodes");
jest.mock("./setLocalStorageKey");
jest.mock("@client-utils/debug/debugLog");

describe("storeGroupCode", () => {
  const { ACTIVE_GROUP_CODE, STORED_GROUP_CODES, NEW_TEST_GROUP_CODE } =
    MOCK_LOCALSTORAGE_VALUES;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new group code if it is not already present", () => {
    getStoredGroupCodes.mockReturnValue([]);
    setLocalStorageKey.mockReturnValue(true);

    const result = storeGroupCode(ACTIVE_GROUP_CODE);

    expect(result).toBe(true);
    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [ACTIVE_GROUP_CODE],
    );
  });

  it("should not add the code if it already exists in the stored array", () => {
    getStoredGroupCodes.mockReturnValue(STORED_GROUP_CODES);

    const result = storeGroupCode(ACTIVE_GROUP_CODE);

    expect(result).toBe(true);
    expect(setLocalStorageKey).not.toHaveBeenCalled();
  });

  it("should append a unique code to the existing list", () => {
    getStoredGroupCodes.mockReturnValue([ACTIVE_GROUP_CODE]);
    setLocalStorageKey.mockReturnValue(true);

    storeGroupCode(NEW_TEST_GROUP_CODE);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.STORED_GROUP_CODES,
      [ACTIVE_GROUP_CODE, NEW_TEST_GROUP_CODE],
    );
  });
});
