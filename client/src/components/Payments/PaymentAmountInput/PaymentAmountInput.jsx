// React and Third-Party Libraries
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { validateAndProcessAmountInput } from "../../../utils/formatUtils";

// Styles
import styles from "./PaymentAmountInput.module.css";

/**
 * Input component for handling payment amount when creating or updating payments.
 *
 * @param {Object} props - The component props.
 * @param {string} props.paymentAmount - The current payment amount.
 * @param {Function} props.onAmountChange - Callback function to handle changes in payment amount.
 * @param {Function} props.setFormChanged - Optional callback function to indicate form changes.
 * @param {boolean} props.isUpdate - Indicates whether it's an update. If true, no autofocus on mount and little different CSS style

 * @returns {JSX.Element} React component. */
const PaymentAmountInput = ({
  paymentAmount,
  onAmountChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  // Autofocus input field on mount if isUpdate is false
  useEffect(() => {
    if (!isUpdate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdate, inputRef]);

  // If update, remove isUpdate class after click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    if (isUpdate && inputRef.current) {
      inputRef.current.classList.remove(styles.isUpdate);
    }
  };

  // set payment amount state in parent component, convert comma separator to dot prior to posting
  const handlePaymentAmountChange = (e) => {
    onAmountChange(validateAndProcessAmountInput(e.target.value));
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={`${styles.amount} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={paymentAmount}
        onClick={handleInputClick}
        onChange={handlePaymentAmountChange}
        placeholder={t("payment-amount-input-placeholder")}
        inputMode='decimal'
        ref={inputRef}
      />
    </div>
  );
};

export default PaymentAmountInput;
