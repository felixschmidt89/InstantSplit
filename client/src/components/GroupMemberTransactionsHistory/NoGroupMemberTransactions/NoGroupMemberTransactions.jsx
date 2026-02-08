import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./NoGroupMemberTransactions.module.css";

const NoGroupMemberTransactions = () => {
  const { t } = useTranslation();

  return (
    <p className={styles.noTransactions}>
      {t("no-groupmember-transactions-message")}
    </p>
  );
};

export default NoGroupMemberTransactions;
