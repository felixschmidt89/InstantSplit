import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ExpenseDescriptionInput.module.css";

const ExpenseDescriptionInput = ({
  value,
  onDescriptionChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isUpdate) {
      inputRef.current?.focus();
    }
  }, [isUpdate]);

  const handleInputClick = () => {
    if (isUpdate) {
      inputRef.current?.classList.remove(styles.isUpdate);
    }
  };

  const handleExpenseDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
    setFormChanged?.(true);
  };

  return (
    <div className={styles.container}>
      <input
        className={`${styles.description} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={value}
        onClick={handleInputClick}
        onChange={handleExpenseDescriptionChange}
        placeholder={t("expense-description-input-placeholder")}
        ref={inputRef}
      />
    </div>
  );
};

export default ExpenseDescriptionInput;
