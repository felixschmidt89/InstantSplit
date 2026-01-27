// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Components
import Emoji from "../../Emoji/Emoji";

// Styles
import styles from "./ExpensesSettled.module.css";

/**
 * Component for rendering a message indicating that all group expenses are settled.
 *
 * @returns {JSX.Element} React component. */
const ExpensesSettled = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.balancesSettled}>
      {t("all-expenses-settled")}.{" "}
      <Emoji
        ariaLabel={"Expenses settled emoji"}
        emoji={emojiConstants.settle}></Emoji>
    </p>
  );
};

export default ExpensesSettled;
