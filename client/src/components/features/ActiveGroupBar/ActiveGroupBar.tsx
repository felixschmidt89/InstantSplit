// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Hooks
import useSettingsEmoji from "../../../hooks/useSettingsEmoji";
import useIsSlimDevice from "../../../hooks/useIsSlimDevice";
import useIsNotoEmojiFontLoaded from "../../../hooks/useIsNotoEmojiFontLoaded";

// Component
import GroupActionsEmojiButton from "../../common/GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./ActiveGroupBar.module.css";

/**
 * Toolbar displaying a set of navigation icons for creating expenses, payments & group members, for settling expenses within a group and for navigating to group settings.
 */
const ActiveGroupBar = () => {
  // Handle Firefox bug (settings emoji not rendered correctly https://github.com/googlefonts/noto-emoji/issues/391)
  const settingsEmoji = useSettingsEmoji();
  const { t } = useTranslation();
  const { isSlimDevice } = useIsSlimDevice();
  const notoEmojiFontIsLoaded = useIsNotoEmojiFontLoaded();

  console.log("isSlimDevice", isSlimDevice);

  // Render the group actions bar if emoji font is loaded
  return notoEmojiFontIsLoaded ? (
    <div
      className={styles.groupActionsBar}
      role='toolbar'
      aria-label='active group bar'>
      {/* Button for navigating to group settings */}
      <GroupActionsEmojiButton
        route={"group-settings"}
        emoji={settingsEmoji || ""}
        translateX={0}
        explanationText={t("active-group-bar-settings-emoji-copy")}
        ariaLabel='group settings emoji'
      />

      {/* Button for navigating to adding users */}
      <GroupActionsEmojiButton
        route={"create-group-members"}
        emoji={emojiConstants.member}
        plusIcon={true}
        plusIconTranslateX={-0.8}
        explanationText={t("active-group-bar-member-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.25 : 0.4}
        ariaLabel='add group member emoji'
        scale={0.97}
        translateY={-0.05}
      />
      {/* Button for navigating to adding expenses */}
      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        plusIcon={true}
        plusIconTranslateX={-0.6}
        explanationText={t("active-group-bar-expense-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.15 : 0.2}
        ariaLabel='add expense emoji'
      />
      {/* Button for navigating to adding payments */}
      {/* <GroupActionsEmojiButton
        route={"create-payment"}
        emoji={emojiConstants.payment}
        translateX={0}
        plusIconTranslateX={-1.5}
        plusIcon={true}
        explanationText={t("active-group-bar-payment-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.6 : 0.7}
        ariaLabel='add payment emoji'
      /> */}
      {/* Button for navigating to settling expenses */}
      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        explanationText={t("active-group-bar-settle-emoji-copy")}
        ariaLabel='settle expenses emoji'
        translateY={-0.1}
        scale={1.1}
      />
    </div>
  ) : null;
};

export default ActiveGroupBar;
