// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./SwitchViewButton.module.css";

/**
 * renders switch view button.
 *
 * @param {string} text - The text to display on the button.
 * @param {boolean} isActive - Whether the button appears active or not.
 * @param {Function} onClick - Function to handle button click.
 * @returns {JSX.Element} React component. */
const SwitchViewButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.expensesButton : styles.balancesButton} ${isActive ? styles.activeButton : styles.inactiveButton}`}
      onClick={onClick}
      disabled={isActive}>
      {text}
    </button>
  );
};

export default SwitchViewButton;
