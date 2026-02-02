// React and Third-Party Libraries
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./PaymentRecipientSelect.module.css";

/**
 * Select component for selecting the payment recipient when creating or updating payments.
 *
 * @param {Object} props - The component props.
 * @param {string} props.paymentRecipientName - The name of the selected payment recipient.
 * @param {Function} props.onRecipientChange - Callback function to handle changes in the selected payment recipient.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 *  @param {boolean} props.isUpdate - Indicates whether it's an update. If true, field appears inactive on mount
 * @returns {JSX.Element} React component. */
const PaymentRecipientSelect = ({
  paymentRecipientName,
  onRecipientChange,
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

  const options = groupMembers.map((member) => (
    <option key={member} value={member}>
      {member}
    </option>
  ));

  return (
    <select
      className={`${styles.paymentRecipient} ${
        isUpdate ? styles.isUpdate : ""
      }`}
      value={paymentRecipientName}
      ref={selectRef}
      onClick={handleSelectClick}
      onChange={(e) => onRecipientChange(e.target.value)}>
      {/* Do not preselect user, indicate functionality instead */}
      <option
        value=''
        disabled={!paymentRecipientName}
        selected={!paymentRecipientName}>
        {t("payment-recipient-select-placeholder")}
      </option>
      {options}
    </select>
  );
};

export default PaymentRecipientSelect;
