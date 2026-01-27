// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./SyncGroupCodeExplanation.module.css";

/**
 * Renders an explanation how to sync groupCodes across devices and browsers.
 * @returns {JSX.Element} React component.
 */
const SyncGroupCodeExplanation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{t("sync-groupcode-explanation-header")}</h2>
      <ul className={styles.list}>
        <li>{t("sync-groupcode-explanation-list-item1")},</li>
        <li>{t("sync-groupcode-explanation-list-item2")}</li>
      </ul>
    </div>
  );
};

export default SyncGroupCodeExplanation;
