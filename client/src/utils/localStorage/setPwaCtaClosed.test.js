import { LOCAL_STORAGE_KEYS } from "@client-constants/localStorageConstants";
import { MOCK_TIME } from "@shared-constants/testConstants";
import { setPwaCtaClosed } from "./setPwaCtaClosed";
import { setLocalStorageKey } from "./setLocalStorageKey";

jest.mock("./setLocalStorageKey");

describe("setPwaCtaClosed", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Date, "now").mockImplementation(() => MOCK_TIME.NOW);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should call setLocalStorageKey with the correct PWA key and current timestamp", () => {
    setLocalStorageKey.mockReturnValue(true);

    const result = setPwaCtaClosed();

    expect(result).toBe(true);
    expect(setLocalStorageKey).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED,
      MOCK_TIME.NOW,
    );
  });

  test("should return false if setLocalStorageKey fails", () => {
    setLocalStorageKey.mockReturnValue(false);

    const result = setPwaCtaClosed();

    expect(result).toBe(false);
  });
});
