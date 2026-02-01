import { setStoredView } from "./setStoredView";
import { setLocalStorageKey } from "./setLocalStorageKey";
import { VIEW_TYPES } from "../../constants/viewConstants";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./setLocalStorageKey");

describe("setStoredView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call setLocalStorageKey with the VIEW key and the modern HISTORY value", () => {
    setStoredView(VIEW_TYPES.HISTORY);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW,
      VIEW_TYPES.HISTORY,
    );
  });

  it("should call setLocalStorageKey with the VIEW key and the modern BALANCES value", () => {
    setStoredView(VIEW_TYPES.BALANCES);

    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.VIEW,
      VIEW_TYPES.BALANCES,
    );
  });

  it("should return the boolean status from the underlying storage utility", () => {
    setLocalStorageKey.mockReturnValue(true);
    expect(setStoredView(VIEW_TYPES.HISTORY)).toBe(true);

    setLocalStorageKey.mockReturnValue(false);
    expect(setStoredView(VIEW_TYPES.BALANCES)).toBe(false);
  });
});
