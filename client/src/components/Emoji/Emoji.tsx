// React and Third-Party Libraries
import React from "react";

// Hooks
import useIsNotoEmojiFontLoaded from "../../hooks/useIsNotoEmojiFontLoaded";

// Styles
import styles from "./Emoji.module.css";

type EmojiProps = {
  ariaLabel: string;
  emoji: string;
  scale?: number;
  /**
   * horizontal translation of the emoji in rem unit.
   */
  translateX?: number;
  /**
   * The vertical translation of the emoji in rem unit.
   */
  translateY?: number;
};

/**
 * Component for rendering unicolor emojis.
 */
const Emoji = ({
  ariaLabel,
  emoji,
  scale = 1,
  translateX = 0,
  translateY = 0,
}: EmojiProps) => {
  const notoEmojiFontIsLoaded = useIsNotoEmojiFontLoaded();

  const emojiStyle = {
    transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
  };

  return notoEmojiFontIsLoaded ? (
    <span
      role='img'
      aria-label={ariaLabel}
      className={styles.emojiFont}
      style={emojiStyle}>
      {emoji}
    </span>
  ) : null;
};

export default Emoji;
