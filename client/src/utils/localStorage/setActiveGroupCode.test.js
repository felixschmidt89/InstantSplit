import { MOCK_LOCALSTORAGE_VALUES } from "../../../../shared/constants/testConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";
import { setActiveGroupCode } from "./setActiveGroupCode";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setActiveGroupCode", () => {
  const mockKey = LOCAL_STORAGE_KEYS.ACTIVE_GROUP_CODE;
  const mockValue = MOCK_LOCALSTORAGE_VALUES.ACTIVE_GROUP_CODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the correct ACTIVE_GROUP_CODE key and value", () => {
    setActiveGroupCode(mockValue);

    expect(setLocalStorageKey).toHaveBeenCalledWith(mockKey, mockValue);
  });

  it("should return true when core utility succeeds", () => {
    setLocalStorageKey.mockReturnValue(true);

    const result = setActiveGroupCode(mockValue);

    expect(result).toBe(true);
  });

  it("should return false when core utility fails", () => {
    setLocalStorageKey.mockReturnValue(false);

    const result = setActiveGroupCode(mockValue);

    expect(result).toBe(false);
  });
});
