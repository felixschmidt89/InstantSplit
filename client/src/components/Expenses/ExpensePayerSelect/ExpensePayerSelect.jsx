import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ExpensePayerSelect.module.css";

const ExpensePayerSelect = ({
  expensePayer,
  onPayerChange,
  groupMembers,
  setFormChanged,
  isUpdate = false,
}) => {
  const selectRef = useRef(null);
  const { t } = useTranslation();

  const handlePayerChange = (e) => {
    const selectedId = e.target.value;
    const selectedMember = groupMembers.find((m) => m._id === selectedId);

    onPayerChange(selectedMember);
    setFormChanged?.(true);
  };

  const handleSelectClick = () => {
    if (isUpdate) {
      selectRef.current?.classList.remove(styles.isUpdate);
    }
  };

  const selectedValue = expensePayer?._id || "";

  return (
    <select
      className={`${styles.select} ${isUpdate ? styles.isUpdate : ""}`}
      value={selectedValue}
      onChange={handlePayerChange}
      onClick={handleSelectClick}
      ref={selectRef}>
      <option value='' disabled={!selectedValue}>
        {t("expense-payer-select-paid-by")}
      </option>

      {groupMembers.map((member) => (
        <option key={member._id} value={member._id}>
          {member.userName}
        </option>
      ))}
    </select>
  );
};

export default ExpensePayerSelect;
