import useIsNotoEmojiFontLoaded from "@hooks/useIsNotoEmojiFontLoaded";

import styles from "./Emoji.module.css";

type EmojiProps = {
  ariaLabel: string;
  emoji: string;
  scale?: number;
  translateX?: number;
  translateY?: number;

  // TODO: Indicate unit in prop name (refactor later)
  // translateXRem?: number;
  // translateYRem?: number;
};

const Emoji = ({
  ariaLabel,
  emoji,
  scale = 1,
  translateX = 0,
  translateY = 0,
}: EmojiProps) => {
  // TODO: Fix font not being loaded
  const notoEmojiFontIsLoaded = useIsNotoEmojiFontLoaded();

  const emojiStyle = {
    transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
  };

  return (
    <span
      role='img'
      aria-label={ariaLabel}
      className={notoEmojiFontIsLoaded ? styles.emojiFont : ""}
      style={emojiStyle}>
      {emoji}
    </span>
  );
};

export default Emoji;
