import { PWA_PROMPT_RESHOW_THRESHOLD_MS } from "../../../../shared/constants/system/systemConstants";
import getPwaCtaClosedFromLocalStorage from "../localStorage/getPwaCtaClosedFromLocalStorage.js";

export const shouldShowPwaPrompt = () => {
  const lastPwaPromptClosure = getPwaCtaClosedFromLocalStorage();

  if (!lastPwaPromptClosure) return true;

  const lastClosureTimestamp = Number(lastPwaPromptClosure);

  if (isNaN(lastClosureTimestamp)) return true;

  const timeElapsed = Date.now() - lastClosureTimestamp;

  return timeElapsed >= PWA_PROMPT_RESHOW_THRESHOLD_MS;
};
