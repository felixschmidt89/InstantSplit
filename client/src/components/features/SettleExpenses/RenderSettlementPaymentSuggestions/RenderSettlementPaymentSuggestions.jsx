// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { calculateSuggestedSettlementPayments } from "../../../../utils/settlementUtils";

// Components
import ConfirmSettlementPayment from "../ConfirmSettlementPayment/ConfirmSettlementPayment";

// Styles
import styles from "./RenderSettlementPaymentSuggestions.module.css";
import RenderReactIcon from "../../../common/RenderReactIcon/RenderReactIcon";

/**
 * Component for rendering settlement payment suggestions.
 *
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.negativeBalanceUsers - An array of users with negative balances.
 * @param {Object[]} props.positiveBalanceUsers - An array of users with positive balances.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component.
 */
const RenderSettlementPaymentSuggestions = ({
  fixedDebitorCreditorOrder,
  positiveBalanceUsers,
  negativeBalanceUsers,
  groupCurrency,
  groupCode,
}) => {
  const { t } = useTranslation();

  const [settlementPaymentSuggestions, setSettlementPaymentSuggestions] =
    useState([]);

  useEffect(() => {
    setSettlementPaymentSuggestions(
      calculateSuggestedSettlementPayments(
        positiveBalanceUsers,
        negativeBalanceUsers
      )
    );
  }, [negativeBalanceUsers, positiveBalanceUsers]);

  return (
    <div className={styles.container}>
      <ul>
        {settlementPaymentSuggestions.map((settlement, index) => (
          <li key={index} className={styles.paymentSuggestions}>
            <div className={styles.makerAndRecipient}>
              <span
                className={styles.paymentMaker}
                aria-label={`Payment maker name`}>
                {settlement.from}{" "}
              </span>
              <span className={styles.paymentTo}>
                <RenderReactIcon
                  icon={IoArrowForwardOutline}
                  translateY={0.2}
                />
              </span>{" "}
              <span
                aria-label={`Payment recipient name`}
                className={styles.paymentRecipient}>
                {settlement.to}
              </span>
              <div className={styles.amount}>
                <span className={styles.dueKey}>
                  {t("render-settlement-payment-suggestions-due")}:
                </span>
                <span
                  className={styles.settlementAmount}
                  aria-label={`Settlement payment amount`}>
                  {settlement.amount}
                </span>
                <span className={styles.currency}>{groupCurrency}</span>
              </div>
            </div>
            <div className={styles.confirm}>
              <ConfirmSettlementPayment
                positiveBalanceUsers={positiveBalanceUsers}
                fixedDebitorCreditorOrder={fixedDebitorCreditorOrder}
                paymentAmount={settlement.amount}
                paymentMakerName={settlement.from}
                paymentRecipientName={settlement.to}
                groupCode={groupCode}
                groupCurrency={groupCurrency}
                settlementPaymentSuggestions={settlementPaymentSuggestions}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderSettlementPaymentSuggestions;
