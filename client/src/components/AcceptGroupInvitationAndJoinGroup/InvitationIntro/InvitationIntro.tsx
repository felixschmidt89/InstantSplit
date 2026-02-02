// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InvitationIntro.module.css";

type InvitationIntroProps = {
  groupName: string;
};

/**
 * Component to briefly introduce users to InstantSplit when opening a group invitation.
 */
const InvitationIntro = ({ groupName }: InvitationIntroProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p>
        {t("invitation-intro-copy1")}
        <span className={styles.groupName}> {groupName} </span>
        {t("invitation-intro-copy2")}
      </p>
    </div>
  );
};

export default InvitationIntro;
