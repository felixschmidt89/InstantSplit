// React and Third-Party Libraries
import React from "react";

import { useTranslation } from "react-i18next";

// Styles
import styles from "./RenderExpenseDetails.module.css";

/**
 * Component for rendering expense details.
 * @param {Object} props - The component props.
 * @param {Object} props.expenseInfo - expense information.
 * @param {number} props.expenseAmountPerBeneficiary - the amount per expense beneficiary.
 * @param {string} props.groupCurrency - currency set in group settings.
 * @returns {JSX.Element} React component.
 */
const RenderExpenseDetails = ({
  expenseInfo,
  expenseAmountPerBeneficiary,
  groupCurrency,
}) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.container}>
      <li className={styles.listItem}>
        <span className={styles.key}>
          {t("render-expense-details-total-amount")}:
        </span>
        <span className={styles.value}>
          {expenseInfo.expenseAmount.toFixed(2)}
          {groupCurrency}
        </span>
      </li>
      <li className={styles.listItem}>
        <span className={styles.key}>
          {t("render-expense-details-paid-by")}:
        </span>
        <span className={styles.value}>
          {expenseInfo.expensePayer.userName}
        </span>
      </li>
      <li className={styles.listItem}>
        <span className={styles.key}>
          {t("render-expense-details-amount-per-beneficiary")}:
        </span>
        <span className={styles.value}>
          {expenseAmountPerBeneficiary.toFixed(2)}
          {groupCurrency}
        </span>
      </li>
    </ul>
  );
};

export default RenderExpenseDetails;
