import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { validateAndProcessAmountInput } from "../../../../utils/formatUtils";
import styles from "./ExpenseAmountInput.module.css";

const ExpenseAmountInput = ({
  value,
  onAmountChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  // TODO: Refactor to hook or utility function if similar patterns emerge
  const handleInputClick = () => {
    if (isUpdate) {
      inputRef.current?.classList.remove(styles.isUpdate);
    }
  };

  const handleExpenseAmountChange = (e) => {
    onAmountChange(validateAndProcessAmountInput(e.target.value));
    setFormChanged?.(true);
  };

  return (
    <div className={styles.container}>
      <input
        className={`${styles.amount} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={value}
        onClick={handleInputClick}
        onChange={handleExpenseAmountChange}
        ref={inputRef}
        placeholder={t("expense-amount-input-placeholder")}
        inputMode='decimal'
      />
    </div>
  );
};

export default ExpenseAmountInput;
