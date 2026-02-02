// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./GroupMemberTotals.module.css";

/**
 * Renders a group member's expenses and payments totals: expenses/payments paid and expenses/payments benefitted from
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.groupMemberData - group member data containing expense totals.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const GroupMemberTotals = ({ groupMemberData, groupCurrency }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div
        role='region'
        aria-label='Group Member Expense Totals'
        className={styles.totalsContainer}>
        <h3>{t("groupmember-totals-expense-totals-header")}</h3>
        <ul className={styles.list}>
          {/* total expenses paid amount with 2 decimal places */}
          <li className={styles.item}>
            <span className={styles.key}>
              {t("groupmember-totals-payment-paid-for")}:
            </span>
            <span className={styles.value}>
              {groupMemberData.totalExpensesPaidAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.key}>
              {/* total expenses benefitted from amount with 2 decimal places */}
              {t("groupmember-totals-payment-benefitted-from")}:
            </span>
            <span className={styles.value}>
              {groupMemberData.totalExpenseBenefittedAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
        </ul>
      </div>
      <div
        role='region'
        aria-label='Group Member Payments Totals'
        className={styles.totalsContainer}>
        <h3>{t("groupmember-totals-payment-totals-header")}</h3>
        <ul className={styles.list}>
          {/* total payments made amount with 2 decimal places */}
          <li className={styles.item}>
            <span className={styles.key}>
              {t("groupmember-totals-payment-payments-made")}:
            </span>{" "}
            <span className={styles.value}>
              {groupMemberData.totalPaymentsMadeAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.key}>
              {/* total payments received amount with 2 decimal places */}
              {t("groupmember-totals-payment-payments-received")}:
            </span>
            <span className={styles.value}>
              {groupMemberData.totalPaymentsReceivedAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupMemberTotals;
