// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import CopyToClipboard from "../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./ShareGroupInvitation.module.css";
import useIsSlimDevice from "../../../hooks/useIsSlimDevice";
/**
 * Renders option for sharing a group invitation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.invitationLinkDE - German meta tags invitation link.
 *  @param {string} props.invitationLinkEN - English meta tags invitation link. 
 * @param {string} props.predeterminedInvitationLink - Predetermined invitation link (in parent component).

 * @returns {JSX.Element} React component. */
const ShareGroupInvitation = ({
  groupName,
  predeterminedInvitationLink,
  invitationLinkDE,
  invitationLinkEN,
}) => {
  const { t, i18n } = useTranslation();

  const { isSlimDevice } = useIsSlimDevice();

  // Check language locale
  const isGerman = i18n.language === "de";

  // Determine the appropriate invitation link
  const invitationLink =
    predeterminedInvitationLink ||
    (isGerman ? invitationLinkDE : invitationLinkEN);

  return (
    <div className={styles.container}>
      <div className={styles.invitationLink}>
        {t("share-group-invitation-explanation-part1")}{" "}
        <span className={styles.groupName}>
          {t("share-group-invitation-explanation-groupname", {
            groupName,
          })}{" "}
        </span>
        {t("share-group-invitation-explanation-part2")}:{" "}
      </div>
      <CopyToClipboard
        infoToCopy={invitationLink}
        inputFieldWidth={isSlimDevice ? 25 : 30}
      />
    </div>
  );
};

export default ShareGroupInvitation;
