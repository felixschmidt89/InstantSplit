// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./Disclaimer.module.css";

/**
 * Component for rendering a terms and conditions disclaimer.
 * @param {string} lastUpdateDate date of the last terms and conditions update in YYYY-MM-DD format.
 * @returns {JSX.Element} React component. */
const Disclaimer = ({ lastUpdateDate }) => {
  const { t } = useTranslation();

  // Determine date format based on user language as LocaleDateString provides unreliable results
  const userLanguage = localStorage.getItem("language") || "de";
  const dateFormat = userLanguage === "de" ? "de-DE" : "en-UK";
  const lastUpdate = new Date(lastUpdateDate).toLocaleDateString(dateFormat);

  return (
    <div className={styles.container}>
      <h2>{t("disclaimer-header")}</h2>
      <p className={styles.disclaimer}>
        {t("disclaimer-copy")} <strong>{lastUpdate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
