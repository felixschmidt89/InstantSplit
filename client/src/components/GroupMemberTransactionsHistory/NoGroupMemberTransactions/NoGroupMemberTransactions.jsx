// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./NoGroupMemberTransactions.module.css";

/**
 * Component rendering a message when there are no expenses or payments associated with the user.
 * @returns {JSX.Element} React component. */
const NoUserTransactions = () => {
  const { t } = useTranslation();

  return (
    <p className={styles.noTransactions}>
      {t("no-groupmember-transactions-message")}
    </p>
  );
};

export default NoUserTransactions;
