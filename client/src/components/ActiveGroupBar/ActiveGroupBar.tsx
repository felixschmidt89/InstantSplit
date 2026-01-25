import { useTranslation } from "react-i18next";

import useSettingsEmoji from "@hooks/useSettingsEmoji";
import useIsSlimDevice from "@hooks/useIsSlimDevice";
import useIsNotoEmojiFontLoaded from "@hooks/useIsNotoEmojiFontLoaded";

import GroupActionsEmojiButton from "../GroupActionsEmojiButton/GroupActionsEmojiButton";

import styles from "./ActiveGroupBar.module.css";
import emojiConstants from "@/constants/emojiConstants";

const ActiveGroupBar = () => {
  const settingsEmoji = useSettingsEmoji();
  const { t } = useTranslation();
  const isSlimDevice = useIsSlimDevice();

  const notoEmojiFontIsLoaded = useIsNotoEmojiFontLoaded();

  if (!notoEmojiFontIsLoaded) {
    return null;
  }

  return (
    <div
      className={styles.groupActionsBar}
      role='toolbar'
      aria-label='active group bar'>
      <GroupActionsEmojiButton
        route={"group-settings"}
        emoji={settingsEmoji || ""}
        translateX={0}
        explanationText={t("active-group-bar-settings-emoji-copy")}
        ariaLabel='group settings emoji'
      />

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

      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        plusIcon={true}
        plusIconTranslateX={-0.6}
        explanationText={t("active-group-bar-expense-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.15 : 0.2}
        ariaLabel='add expense emoji'
      />

      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        explanationText={t("active-group-bar-settle-emoji-copy")}
        ariaLabel='settle expenses emoji'
        translateY={-0.1}
        scale={1.1}
      />
    </div>
  );
};

export default ActiveGroupBar;
