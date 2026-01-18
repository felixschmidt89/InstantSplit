// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

// Styles
import styles from "./GroupActionsEmojiButton.module.css";

type GroupActionsEmojiButtonProps = {
  route: string;
  emoji: string;
  plusIcon?: boolean;
  plusIconTranslateX?: number;
  explanationText?: string;
  explanationTextTranslateX?: number;
  ariaLabel: string;
  translateX?: number;
  translateY?: number;
  scale?: number;
};

/**
 * Renders a button component with an emoji, action explanationText, and navigates to a specified route on click. Can be amended using translateX, translateY, and scale props.
 */
const GroupActionsEmojiButton = ({
  route,
  emoji,
  plusIcon = false,
  plusIconTranslateX = 0,
  explanationText,
  explanationTextTranslateX = 0,
  ariaLabel,
  translateX = 0,
  translateY = 0,
  scale = 1,
}: GroupActionsEmojiButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      aria-label={ariaLabel}>
      <span
        className={styles.emojiContainer}
        style={{
          transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
        }}>
        <span className={styles.emoji}>{emoji}</span>
        {plusIcon && (
          <FaPlus
            className={styles.plusIcon}
            style={{ right: `${plusIconTranslateX}rem` }}
          />
        )}
      </span>
      {explanationText && (
        <span
          className={styles.iconExplanation}
          style={{ transform: `translateX(${explanationTextTranslateX}rem)` }}>
          {explanationText}
        </span>
      )}
    </div>
  );
};

export default GroupActionsEmojiButton;
