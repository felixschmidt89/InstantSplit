// React and Third-Party Libraries
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./PaymentMakerSelect.module.css";

/**
 * Component for selecting payment maker when creating or updating payments.
 * @param {Object} props - The component props.
 * @param {string} props.paymentMakerName - The name of the selected payment maker.
 * @param {Function} props.onPaymentMakerChange - Callback function to handle changes in the selected payment maker.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @param {boolean} props.isUpdate - Indicates whether it's an update. If true, field appears inactive on mount
 * @returns {JSX.Element} React component. */
const PaymentMakerSelect = ({
  paymentMakerName,
  onPaymentMakerChange,
  groupMembers,
  isUpdate = false,
}) => {
  const selectRef = useRef(null);
  const { t } = useTranslation();

  // If update, remove isUpdate class after click, so that select does not fall back to appearing inactive
  const handleSelectClick = () => {
    if (isUpdate && selectRef.current) {
      selectRef.current.classList.remove(styles.isUpdate);
    }
  };

  return (
    <select
      className={`${styles.paymentMaker} ${isUpdate ? styles.isUpdate : ""}`}
      value={paymentMakerName}
      ref={selectRef}
      onClick={handleSelectClick}
      onChange={(e) => onPaymentMakerChange(e.target.value)}>
      {/* Do not preselect user, indicate functionality instead */}
      <option
        value=''
        disabled={!paymentMakerName}
        selected={!paymentMakerName}>
        {t("payment-maker-select-placeholder")}
      </option>
      {groupMembers.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
};

export default PaymentMakerSelect;
