import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";
import { devLog } from "../utils/errorUtils";
import { FONT_STATE, FONTS } from "../constants/fontConstants";

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
          devLog(`${FONTS.NOTO_EMOJI} loaded successfully.`);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setFontState(FONT_STATE.FALLBACK);
          setIsLoaded(true);
          devLog(
            `${FONTS.NOTO_EMOJI} failed or timed out. Using fallback.`,
            error,
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
