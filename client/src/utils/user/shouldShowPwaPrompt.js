import { PWA_PROMPT_RESHOW_THRESHOLD_MS } from "../../../../shared/constants/applicationConstants";
import { getPwaCtaClosedFromLocalStorage } from "../localStorage";

export const shouldShowPwaPrompt = () => {
  const lastPwaPromptClosure = getPwaCtaClosedFromLocalStorage();

  if (!lastPwaPromptClosure) return true;

  const lastClosureTimestamp = Number(lastPwaPromptClosure);

  if (isNaN(lastClosureTimestamp)) return true;

  const timeElapsed = Date.now() - lastClosureTimestamp;

  return timeElapsed >= PWA_PROMPT_RESHOW_THRESHOLD_MS;
};
