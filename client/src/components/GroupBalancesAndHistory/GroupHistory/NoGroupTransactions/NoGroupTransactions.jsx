// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../Emoji/Emoji";

// Styles
import styles from "./NoGroupTransactions.module.css";

/**
 * Component to render a call to action when there are no transactions associated with a group.
 *
 * @returns {JSX.Element} React component. */
const NoGroupTransactions = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.noTransactions}>
      {t("no-group-transactions-start-adding-expenses")}{" "}
      <span className={styles.emojiParenthesis}>
        (
        <Emoji
          ariaLabel={"expense emoji"}
          emoji={emojiConstants.expense}
          scale={"1.15"}
          translateX={"0.15"}></Emoji>
        )
      </span>{" "}
      {t("no-group-transactions-add-payments")}{" "}
      <span className={styles.emojiParenthesis}>
        <span className={styles.emojiParenthesis}>
          (
          <Emoji
            ariaLabel={"payment emoji"}
            emoji={emojiConstants.payment}></Emoji>
          )
        </span>{" "}
      </span>{" "}
      {t("no-group-transactions-below")}{" "}
      <span
        className={styles.emojiParenthesis}
        role='img'
        aria-label='Point Down Emoji'>
        (
        <Emoji
          ariaLabel={"pont down emoji"}
          emoji={emojiConstants.pointDown}></Emoji>
        )
      </span>
      {t("no-group-transactions-append")}.
    </p>
  );
};

export default NoGroupTransactions;
