// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {Object} props - Component props.
 * @param {string | object} props.error - The error message or error object to display.
 * @param {number} props.remWidth - The width in rem (defaults to 20).
 * @param {boolean} props.errorFontColor - Flag to determine if error font color should be used (defaults to false).
 */
const ErrorDisplay = ({ error, remWidth = 20, errorFontColor = false }) => {
  const { t } = useTranslation();

  if (!error) {
    return null;
  }

  // Determine the error message to display
  const errorMessage =
    typeof error === "string"
      ? error
      : error.message || t("generic-error-message");
  return (
    <p
      className={styles.errorMessage}
      style={{
        width: `${remWidth}rem`,
        color: errorFontColor ? "var(--color-error)" : "var(--color-dark)",
      }}>
      {errorMessage}
    </p>
  );
};

export default ErrorDisplay;
