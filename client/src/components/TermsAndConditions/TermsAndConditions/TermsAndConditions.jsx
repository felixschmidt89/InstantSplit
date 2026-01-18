// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import Disclaimer from "../Disclaimer/Disclaimer";
import SingleTermsAndConditions from "../SingleTermsAndConditions/SingleTermsAndConditions";

// Styles
import styles from "./TermsAndConditions.module.css";

/**
 * Parent component to render terms and conditions
 * @param {Array} sections - An array of objects representing sections with keys, titles, and content.
 * @returns {JSX.Element} React component. */
const TermsAndConditions = () => {
  const { t } = useTranslation();
  const sections = t("terms-and-conditions-sections", { returnObjects: true });

  return (
    <div className={styles.container}>
      <Disclaimer lastUpdateDate={"2024-03-05"} />
      <h2>{t("terms-and-conditions-header")}</h2>
      <SingleTermsAndConditions sections={sections} />
    </div>
  );
};

export default TermsAndConditions;
