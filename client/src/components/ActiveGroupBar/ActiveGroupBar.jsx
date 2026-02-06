import { useTranslation } from "react-i18next";

import useIsNotoEmojiFontLoaded from "../../hooks/useIsNotoEmojiFontLoaded";
import useIsSlimDevice from "../../hooks/useIsSlimDevice";
import useSettingsEmoji from "../../hooks/useSettingsEmoji";

import GroupActionsEmojiButton from "../GroupActionsEmojiButton/GroupActionsEmojiButton";
import emojiConstants from "../../constants/emojiConstants";
// Ensure this path matches where you saved the ROUTES file
import { ROUTES } from "../../constants/routesConstants";

import styles from "./ActiveGroupBar.module.css";

const ActiveGroupBar = () => {
  const { t } = useTranslation();
  const settingsEmoji = useSettingsEmoji();
  const isSlimDevice = useIsSlimDevice();
  const { isLoaded, fontState } = useIsNotoEmojiFontLoaded();

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={styles.groupActionsBar}
      role='toolbar'
      aria-label='active group bar'
      data-font-state={fontState}>
      <GroupActionsEmojiButton
        route={ROUTES.GROUP_SETTINGS}
        emoji={settingsEmoji}
        translateX={0}
        explanationText={t("active-group-bar-settings-emoji-copy")}
        ariaLabel='group settings emoji'
      />

      <GroupActionsEmojiButton
        route={ROUTES.MEMBERS.CREATE}
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
        route={ROUTES.EXPENSE.CREATE}
        emoji={emojiConstants.expense}
        plusIcon={true}
        plusIconTranslateX={-0.6}
        explanationText={t("active-group-bar-expense-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.15 : 0.2}
        ariaLabel='add expense emoji'
      />

      <GroupActionsEmojiButton
        route={ROUTES.SETTLE_EXPENSES}
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
