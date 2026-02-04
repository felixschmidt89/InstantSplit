// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./LegalNoticeSections.module.css";

/**
 * Renders legal notice sections.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.legalNoticeSections - An array of legal notice sections.
 * @returns {JSX.Element} React component. */
const LegalNoticeSections = ({ legalNoticeSections }) => {
  return (
    <div className={styles.container}>
      {legalNoticeSections &&
        legalNoticeSections.map((section) => (
          <div key={section.key} className={styles.section}>
            <h2>{section.title}</h2>
            <div>{section.content}</div>
          </div>
        ))}
    </div>
  );
};

export default LegalNoticeSections;
