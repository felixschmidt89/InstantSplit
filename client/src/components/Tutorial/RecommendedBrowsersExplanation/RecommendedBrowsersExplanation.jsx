// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./RecommendedBrowsersExplanation.module.css";

/**
 * Component for rendering explanation of the GroupCode for accessing a group and providing related information to store it.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} initialGroupName - The group name set during group creation.
 * @param {string} props.groupCode - The GroupCode for accessing the group.
 * @returns {JSX.Element} React component. */
const RecommendedBrowsersExplanation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{t("recommended-browsers-header")}</h2>
      <div className={styles.explanation}>
        <ul className={styles.recommendedBrowsersList}>
          <li>
            <a
              href={t("recommended-browsers-chrome-link")}
              target='_blank'
              rel='noopener noreferrer'>
              Chrome
            </a>{" "}
          </li>
          <li>
            <a
              href={t("recommended-browsers-safari-link")}
              target='_blank'
              rel='noopener noreferrer'>
              Safari
            </a>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecommendedBrowsersExplanation;
