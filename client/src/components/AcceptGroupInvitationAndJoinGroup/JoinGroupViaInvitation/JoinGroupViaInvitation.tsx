// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import InvitationIntro from "../InvitationIntro/InvitationIntro";
import InstantSplitIntroSection from "../../Home/InstantSplitIntroSection/InstantSplitIntroSection";
import AcceptGroupInvitation from "../AcceptGroupInvitation/AcceptGroupInvitation";

// Styles
import styles from "./JoinGroupViaInvitation.module.css";

type JoinGroupViaInvitationProps = {
  groupCode: string;
  groupName: string;
};

/**
 * renders the interface for joining a group via invitation.
 * @param {object} props - Component props.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @param {string} props.groupName - The name of the group.
 * @returns {JSX.Element} React component.
 */
const JoinGroupViaInvitation = ({
  groupCode,
  groupName,
}: JoinGroupViaInvitationProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.homepageHeader}>{t("join-group-page-header")}</h1>
        <InvitationIntro groupName={groupName} />
        <InstantSplitIntroSection isInvitation={true} />
        <div className={styles.acceptInvitationSection}>
          <AcceptGroupInvitation groupCode={groupCode} groupName={groupName} />
        </div>
      </div>
    </>
  );
};
export default JoinGroupViaInvitation;
