import { isWebShareSupported } from "./isWebShareSupported";

describe("isWebShareSupported", () => {
  const originalShare = navigator.share;

  afterEach(() => {
    jest.clearAllMocks();
    if (originalShare === undefined) {
      delete navigator.share;
    } else {
      Object.defineProperty(navigator, "share", {
        value: originalShare,
        configurable: true,
      });
    }
  });

  it("should return true when navigator.share is present", () => {
    Object.defineProperty(navigator, "share", {
      value: jest.fn(),
      configurable: true,
    });

    expect(isWebShareSupported()).toBe(true);
  });

  it("should return false when navigator.share is missing/undefined", () => {
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
    });

    expect(isWebShareSupported()).toBe(false);
  });
});
