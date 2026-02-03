import React, { useRef } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import emojiConstants from "../../../constants/emojiConstants";
import Emoji from "../../Emoji/Emoji";
import { toggleBeneficiariesButtonStyles } from "../../../constants/stylesConstants";
import styles from "./ExpenseBeneficiariesInput.module.css";

const ExpenseBeneficiariesInput = ({
  expenseBeneficiaries,
  setExpenseBeneficiaries,
  groupMembers,
  setFormChanged,
  isUpdate = false,
}) => {
  const divRef = useRef(null);
  const buttonRef = useRef(null);
  const { t } = useTranslation();

  const handleDivOrButtonClick = () => {
    if (isUpdate) {
      divRef.current?.classList.remove(styles.isUpdate);
      buttonRef.current?.classList.remove(styles.isUpdate);
    }
  };

  const handleCheckboxChange = (member) => {
    handleDivOrButtonClick();

    const isSelected = expenseBeneficiaries.some((b) => b._id === member._id);

    let updatedList;
    if (isSelected) {
      updatedList = expenseBeneficiaries.filter((b) => b._id !== member._id);
    } else {
      updatedList = [...expenseBeneficiaries, member];
    }

    setExpenseBeneficiaries(updatedList);
    setFormChanged?.(true);
  };

  const toggleBeneficiaries = () => {
    handleDivOrButtonClick();

    setExpenseBeneficiaries(
      expenseBeneficiaries.length === groupMembers.length
        ? []
        : [...groupMembers],
    );

    setFormChanged?.(true);
  };

  if (!groupMembers || !expenseBeneficiaries) return null;

  return (
    <>
      <p className={styles.emoji}>
        <Emoji
          ariaLabel='expense emoji'
          scale={1.15}
          emoji={emojiConstants.expense}
        />
        {t("expense-beneficiaries-input-for")}
      </p>
      <div
        className={`${styles.beneficiaries} ${isUpdate ? styles.isUpdate : ""}`}
        onClick={handleDivOrButtonClick}
        ref={divRef}>
        <div className={styles.groupMemberNames}>
          {groupMembers.map((member) => {
            const isChecked = expenseBeneficiaries.some(
              (b) => b._id === member._id,
            );

            return (
              <span className={styles.label} key={member._id}>
                <label>
                  <input
                    className={`${styles.input} ${isUpdate ? styles.isUpdate : ""}`}
                    type='checkbox'
                    value={member._id}
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(member)}
                  />
                  {member.userName}
                </label>
              </span>
            );
          })}
        </div>
        <div className={styles.button}>
          <Button
            onClick={toggleBeneficiaries}
            style={toggleBeneficiariesButtonStyles}
            color='grey'
            variant='outlined'
            ref={buttonRef}>
            {expenseBeneficiaries.length === groupMembers.length
              ? t("expense-beneficiaries-input-none")
              : t("expense-beneficiaries-input-all")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExpenseBeneficiariesInput;
