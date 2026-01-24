import { useTranslation } from "react-i18next";

import emojiConstants from "@client-constants/emojiConstants";

import Emoji from "@components/Emoji/Emoji";

import styles from "./NotEnoughGroupMembers.module.css";

const NotEnoughGroupMembers = () => {
  const { t } = useTranslation();

  return (
    <p className={styles.failMessage}>
      {t("not-enough-groupmembers-start-adding")}{" "}
      <span className={styles.emojiParanthesis}>
        (<Emoji ariaLabel='user emoji' emoji={emojiConstants.member} />)
      </span>{" "}
      {t("not-enough-groupmembers-below")}{" "}
      <span className={styles.emojiParanthesis}>
        (<Emoji ariaLabel='point down emoji' emoji={emojiConstants.pointDown} />
        )
      </span>
      {t("not-enough-groupmembers-append")}.
    </p>
  );
};

export default NotEnoughGroupMembers;
