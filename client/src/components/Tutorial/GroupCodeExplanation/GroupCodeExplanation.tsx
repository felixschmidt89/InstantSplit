// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import CopyToClipboard from "../../CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./GroupCodeExplanation.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

type GroupCodeExplanationProps = {
  // group name provided during group creation.
  initialGroupName: string;
  groupCode: string;
};

/**
 * Component for rendering explanation of the groupCode for accessing a group and providing related information to store it.
 */
const GroupCodeExplanation = ({
  initialGroupName,
  groupCode,
}: GroupCodeExplanationProps) => {
  const { t } = useTranslation();
  // Force passing URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(initialGroupName);
  const invitationUrl = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <div className={styles.container}>
      <h2>{t("groupcode-explanation-header")}</h2>
      <ul className={styles.list}>
        <li className={styles.groupCodeExplanation}>
          {t("groupcode-explanation-copy-1")}
          <span className={styles.copyButton}>
            <CopyToClipboard infoToCopy={groupCode} />
          </span>
        </li>
        <li className={styles.invitationLink}>
          {t("groupcode-explanation-copy-2")}{" "}
          <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
            {t("groupcode-explanation-invitation-link-text")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GroupCodeExplanation;
