import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";

import debugLog from "../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import FONT_CONFIG from "../constants/fontConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { FONTS, STATE } = FONT_CONFIG;

const useIsNotoEmojiFontLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fontState, setFontState] = useState(null);

  useEffect(() => {
    const font = new FontFaceObserver(FONTS.NOTO_EMOJI);
    let isMounted = true;

    font
      .load(null, 2000)
      .then(() => {
        if (isMounted) {
          setFontState(STATE.LOADED);
          setIsLoaded(true);
          debugLog(`${FONTS.NOTO_EMOJI} loaded successfully.`, {}, INFO);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setFontState(STATE.FALLBACK);
          setIsLoaded(true);
          debugLog(
            `${FONTS.NOTO_EMOJI} failed or timed out. Using fallback.`,
            { error: error.message },
            LOG_ERROR,
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoaded, fontState };
};

export default useIsNotoEmojiFontLoaded;
