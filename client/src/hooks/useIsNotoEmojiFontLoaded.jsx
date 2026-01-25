import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";
import { devLog } from "../utils/errorUtils";

/**
 * Checks if "Noto Emoji" is loaded.
 * Strictly hides content until font is ready OR 5 seconds have passed.
 */
const useIsNotoEmojiFontLoaded = () => {
  const [notoEmojiFontIsLoaded, setNotoEmojiFontIsLoaded] = useState(false);

  useEffect(() => {
    const font = new FontFaceObserver("Noto Emoji");
    let isMounted = true;

    // 1. The Font Loader
    font
      .load(null, 5000) // FontFaceObserver has a built-in timeout param (ms)
      .then(() => {
        if (isMounted) {
          setNotoEmojiFontIsLoaded(true);
          devLog("Noto Emoji Font loaded successfully.");
        }
      })
      .catch((error) => {
        if (isMounted) {
          // If it fails or times out, we finally show the UI
          setNotoEmojiFontIsLoaded(true);
          devLog("Font load failed or timed out, falling back to system.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return notoEmojiFontIsLoaded;
};

export default useIsNotoEmojiFontLoaded;
