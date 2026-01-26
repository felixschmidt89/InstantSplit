import { shouldShowPwaPrompt } from "./shouldShowPwaPrompt";
import { getPwaCtaClosed } from "@client-utils/localStorage";
import { PWA_PROMPT_RESHOW_THRESHOLD_MS } from "@shared-constants/applicationConstants";
import { MOCK_DATA, MOCK_TIME } from "@shared-constants/testConstants";

jest.mock("@client-utils/localStorage");

describe("shouldShowPwaPrompt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_TIME.NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return true if no closure record exists (fresh user)", () => {
    getPwaCtaClosed.mockReturnValue(null);

    expect(shouldShowPwaPrompt()).toBe(true);
  });

  it("should return true if the stored timestamp is corrupt", () => {
    getPwaCtaClosed.mockReturnValue(MOCK_DATA.STRING);

    expect(shouldShowPwaPrompt()).toBe(true);
  });

  it("should return false if the time elapsed is under the threshold", () => {
    getPwaCtaClosed.mockReturnValue(MOCK_TIME.ONE_HOUR_AGO.toString());

    expect(shouldShowPwaPrompt()).toBe(false);
  });

  it("should return true if the time elapsed meets the exact threshold", () => {
    const exactlyThresholdAgo = MOCK_TIME.NOW - PWA_PROMPT_RESHOW_THRESHOLD_MS;
    getPwaCtaClosed.mockReturnValue(exactlyThresholdAgo.toString());

    expect(shouldShowPwaPrompt()).toBe(true);
  });

  it("should return true if the time elapsed exceeds the threshold", () => {
    const wayPastThreshold = MOCK_TIME.NOW - PWA_PROMPT_RESHOW_THRESHOLD_MS * 2;
    getPwaCtaClosed.mockReturnValue(wayPastThreshold.toString());

    expect(shouldShowPwaPrompt()).toBe(true);
  });
});
