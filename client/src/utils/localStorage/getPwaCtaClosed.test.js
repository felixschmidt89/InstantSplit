import { getPwaCtaClosed } from "./getPwaCtaClosed";
import { getLocalStorageKey } from "./getLocalStorageKey";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageConstants";

jest.mock("./getLocalStorageKey");

describe("getPwaCtaClosed", () => {
  const mockKey = LOCAL_STORAGE_KEYS.PWA_CTA_CLOSED;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call getLocalStorageKey with the correct PWA CTA key", () => {
    getPwaCtaClosed();

    expect(getLocalStorageKey).toHaveBeenCalledWith(mockKey);
  });

  it("should return the value from localStorage", () => {
    getLocalStorageKey.mockReturnValue("true");

    const result = getPwaCtaClosed();

    expect(result).toBe("true");
  });

  it("should return null if the key does not exist", () => {
    getLocalStorageKey.mockReturnValue(null);

    const result = getPwaCtaClosed();

    expect(result).toBeNull();
  });
});
