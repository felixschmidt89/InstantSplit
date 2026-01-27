// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import CopyToClipboard from "../../CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./GroupCodeSecurity.module.css";

/**
 * Component for rendering the group code and a CTA to save it.
 * @param {string} groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} React component.
 */
const GroupCodeSecurity = ({ groupCode }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{t("groupcode-security-header")}</h2>
      <div>
        <div className={styles.explanation}>
          {t("groupcode-security-explanation")}:
        </div>
        <div className={styles.groupCode}>
          <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={20} />
        </div>
      </div>
    </div>
  );
};

export default GroupCodeSecurity;
