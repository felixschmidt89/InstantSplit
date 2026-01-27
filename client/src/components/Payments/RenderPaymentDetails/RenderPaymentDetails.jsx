// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./RenderPaymentDetails.module.css";

/**
 * Renders payment details including payment amount, maker, and recipient.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.paymentInfo - Payment information.
 * @param {number} props.paymentInfo.paymentAmount - The amount of the payment.
 * @param {Object} props.paymentInfo.paymentMaker - The user who made the payment.
 * @param {Object} props.paymentInfo.paymentRecipient - The user who received the payment.
 *  @param {string} props.groupCurrency - The currency of the group.

 * @returns {JSX.Element} React component. */
const RenderPaymentDetails = ({ paymentInfo, groupCurrency }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.detailsContainer}>
      <ul className={styles.paymentDetails}>
        <li className={styles.listItem}>
          <span className={styles.key}>
            {t("render-payment-details-paid-by")}:
          </span>
          <span className={styles.userName}>
            {paymentInfo.paymentMaker.userName}
          </span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.key}>
            {t("render-payment-details-paid-to")}:
          </span>
          <span className={styles.userName}>
            {paymentInfo.paymentRecipient.userName}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RenderPaymentDetails;
