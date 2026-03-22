import { useTranslation } from "react-i18next";

import useIsNotoEmojiFontLoaded from "../../hooks/useIsNotoEmojiFontLoaded";
import useIsSlimDevice from "../../hooks/useIsSlimDevice";
import useSettingsEmoji from "../../hooks/useSettingsEmoji";

import GroupActionsEmojiButton from "../GroupActionsEmojiButton/GroupActionsEmojiButton";
import emojiConstants from "../../constants/emojiConstants";

import styles from "./ActiveGroupBar.module.css";
import CLIENT_STATIC_ROUTES from "../../constants/clientStaticRoutesConstants.js";

const { GROUP_SETTINGS, CREATE_MEMBERS, CREATE_EXPENSE, SETTLE_EXPENSES } =
  CLIENT_STATIC_ROUTES;

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
        route={GROUP_SETTINGS}
        emoji={settingsEmoji}
        translateX={0}
        explanationText={t("active-group-bar-settings-emoji-copy")}
        ariaLabel='group settings emoji'
      />

      <GroupActionsEmojiButton
        route={CREATE_MEMBERS}
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
        route={CREATE_EXPENSE}
        emoji={emojiConstants.expense}
        plusIcon={true}
        plusIconTranslateX={-0.6}
        explanationText={t("active-group-bar-expense-emoji-copy")}
        explanationTextTranslateX={isSlimDevice ? 0.15 : 0.2}
        ariaLabel='add expense emoji'
      />

      <GroupActionsEmojiButton
        route={SETTLE_EXPENSES}
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
