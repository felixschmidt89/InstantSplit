// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./PiratePx.module.css";

// PiratePx project ID
const projectId = import.meta.env.VITE_PIRATEPX_PROJECT_ID;

/**
 * PiratePx component rendering a transparent image to get a simple, privacy-respecting, no cookie, zero JavaScript usage counter. Incremented by one, whenever the page is rendered. No session or single user identification.
 *
 * @param {string} [COUNT_IDENTIFIER] - Unique identifier for the page/component/action to be incremented by one.
 * @returns {JSX.Element | null} React component or null if not in production environment */
const PiratePx = ({ COUNT_IDENTIFIER }) => {
  // Render the component only in production environment
  if (process.env.NODE_ENV === "production") {
    return (
      <img
        className={styles.piratePx}
        src={`https://app.piratepx.com/ship?p=${projectId}&i=${COUNT_IDENTIFIER}`}
        alt=''
      />
    );
  }

  return null;
};

export default PiratePx;
