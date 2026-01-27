import React, { useRef } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import emojiConstants from "../../../constants/emojiConstants";
import Emoji from "../../Emoji/Emoji";
import { toggleBeneficiariesButtonStyles } from "../../../constants/stylesConstants";
import styles from "./ExpenseBeneficiariesInput.module.css";

const ExpenseBeneficiariesInput = ({
  selectedBeneficiaries,
  groupMembers,
  onSelectedBeneficiariesChange,
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    onSelectedBeneficiariesChange(
      checked
        ? [...selectedBeneficiaries, value]
        : selectedBeneficiaries.filter((member) => member !== value),
    );

    setFormChanged?.(true);
  };

  const toggleBeneficiaries = () => {
    handleDivOrButtonClick();

    onSelectedBeneficiariesChange(
      selectedBeneficiaries.length === groupMembers.length
        ? []
        : [...groupMembers],
    );

    setFormChanged?.(true);
  };

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
          {groupMembers.map((member) => (
            <span className={styles.label} key={member}>
              <label>
                <input
                  className={`${styles.input} ${isUpdate ? styles.isUpdate : ""}`}
                  type='checkbox'
                  value={member}
                  checked={selectedBeneficiaries.includes(member)}
                  onChange={handleCheckboxChange}
                />
                {member}
              </label>
            </span>
          ))}
        </div>
        <div className={styles.button}>
          <Button
            onClick={toggleBeneficiaries}
            style={toggleBeneficiariesButtonStyles}
            color='grey'
            variant='outlined'
            ref={buttonRef}>
            {selectedBeneficiaries.length === groupMembers.length
              ? t("expense-beneficiaries-input-none")
              : t("expense-beneficiaries-input-all")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExpenseBeneficiariesInput;
