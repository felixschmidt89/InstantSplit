import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";

import { debugLog } from "../../../shared/utils/debug/debugLog";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";
import { FONT_STATE, FONTS } from "../constants/fontConstants";

const { INFO, LOG_ERROR } = LOG_LEVELS;

/**
 * Checks if the Noto Emoji font is loaded and available for use.
 * Uses FontFaceObserver to detect font readiness or timeout.
 *
 * @returns {Object} The font loading status.
 * @returns {boolean} isLoaded - True if the loading attempt has completed (successfully or failed).
 * @returns {string|null} fontState - The final state of the font (e.g., FONT_STATE.LOADED or FONT_STATE.FALLBACK).
 */
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
          setFontState(FONT_STATE.LOADED);
          setIsLoaded(true);
          debugLog(`${FONTS.NOTO_EMOJI} loaded successfully.`, {}, INFO);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setFontState(FONT_STATE.FALLBACK);
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
