// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstantSplitIntroSection.module.css";

type InstantSplitIntroSectionProps = {
  isInvitation?: boolean;
};

/**
 * Component for rendering the introductory section explaining what InstantSplit is about. Shorter copy for invitations.
 */
const InstantSplitIntroSection = ({
  isInvitation = false,
}: InstantSplitIntroSectionProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.introContainer}>
      {isInvitation ? null : (
        <p className={styles.introText}>
          {t("intro-section-regular-intro-text")}:
        </p>
      )}
      <ul className={styles.list}>
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-free")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-user-registration")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-user-tracking")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-app-installation")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-data-purge")}
        </li>{" "}
      </ul>
    </div>
  );
};

export default InstantSplitIntroSection;
