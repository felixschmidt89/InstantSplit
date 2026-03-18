import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/test/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setActiveGroupCodeInLocalStorage } from "./setActiveGroupCodeInLocalStorage";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setActiveGroupCodeInLocalStorage", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;
  const mockValue = MOCK_LOCALSTORAGE_VALUES.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the correct ACTIVE_GROUP_CODE key and value", () => {
    setActiveGroupCodeInLocalStorage(mockValue);

    expect(setLocalStorageKey).toHaveBeenCalledWith(mockKey, mockValue);
  });

  it("should return true when core utility succeeds", () => {
    setLocalStorageKey.mockReturnValue(true);

    const result = setActiveGroupCodeInLocalStorage(mockValue);

    expect(result).toBe(true);
  });

  it("should return false when core utility fails", () => {
    setLocalStorageKey.mockReturnValue(false);

    const result = setActiveGroupCodeInLocalStorage(mockValue);

    expect(result).toBe(false);
  });
});
