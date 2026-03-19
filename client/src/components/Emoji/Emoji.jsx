import FONT_CONFIG from "../../constants/fontConstants.js";
import useIsNotoEmojiFontLoaded from "../../hooks/useIsNotoEmojiFontLoaded.jsx";
import styles from "./Emoji.module.css";

const { STATE } = FONT_CONFIG;

const Emoji = ({
  ariaLabel,
  emoji,
  scale = 1,
  translateX = 0,
  translateY = 0,
}) => {
  const { isLoaded, fontState } = useIsNotoEmojiFontLoaded();

  if (!isLoaded) return null;

  const emojiStyle = {
    transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
  };

  return (
    <span
      role='img'
      aria-label={ariaLabel}
      className={fontState === STATE.LOADED ? styles.emojiFont : ""}
      style={emojiStyle}>
      {emoji}
    </span>
  );
};

export default Emoji;
