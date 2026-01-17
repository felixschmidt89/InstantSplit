import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ExpensePayerSelect.module.css";

const ExpensePayerSelect = ({
  expensePayerName,
  onPayerChange,
  groupMembers,
  setFormChanged,
  isUpdate = false,
}) => {
  const selectRef = useRef(null);
  const { t } = useTranslation();

  const handlePayerChange = (e) => {
    onPayerChange(e.target.value);
    setFormChanged?.(true);
  };

  // TODO: Refactor to hook or utility function if similar patterns emerge
  const handleSelectClick = () => {
    if (isUpdate) {
      selectRef.current?.classList.remove(styles.isUpdate);
    }
  };

  return (
    <select
      className={`${styles.select} ${isUpdate ? styles.isUpdate : ""}`}
      value={expensePayerName || ""}
      onChange={handlePayerChange}
      onClick={handleSelectClick}
      ref={selectRef}>
      <option value='' disabled={!expensePayerName}>
        {t("expense-payer-select-paid-by")}
      </option>
      {groupMembers.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
};

export default ExpensePayerSelect;
