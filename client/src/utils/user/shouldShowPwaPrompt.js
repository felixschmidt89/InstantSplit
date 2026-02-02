import { PWA_PROMPT_RESHOW_THRESHOLD_MS } from "@shared-constants/applicationConstants";
import { getPwaCtaClosed } from "@client-utils/localStorage";

export const shouldShowPwaPrompt = () => {
  const lastPwaPromptClosure = getPwaCtaClosed();

  if (!lastPwaPromptClosure) return true;

  const lastClosureTimestamp = Number(lastPwaPromptClosure);

  if (isNaN(lastClosureTimestamp)) return true;

  const timeElapsed = Date.now() - lastClosureTimestamp;

  return timeElapsed >= PWA_PROMPT_RESHOW_THRESHOLD_MS;
};
