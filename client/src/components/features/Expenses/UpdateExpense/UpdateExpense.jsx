import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { devLog, handleApiErrors } from "../../../../utils/errorUtils";
import { buttonStyles } from "../../../../constants/stylesConstants";
import { changeFixedDebitorCreditorOrderSetting } from "../../../../utils/settlementUtils";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import { ROUTES } from "../../../../constants/routesConstants";
import styles from "./UpdateExpense.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UpdateExpense = ({
  expenseInfo,
  groupCode,
  groupMembers,
  expenseId,
  route = ROUTES.INSTANT_SPLIT,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // TODO: Optimize also regarding readability
  const storedExpenseDescription = expenseInfo.expenseDescription;
  const storedExpenseAmount = expenseInfo.expenseAmount;
  const storedExpensePayerName = expenseInfo.expensePayer.userName;
  const storedBeneficiariesNames = expenseInfo.expenseBeneficiaries.map(
    (beneficiary) => beneficiary.userName,
  );

  // TODO: Optimize also regarding readability
  const [expenseDescription, setExpenseDescription] = useState(
    storedExpenseDescription,
  );
  const [expenseAmount, setExpenseAmount] = useState(storedExpenseAmount);
  const [expensePayerName, setExpensePayerName] = useState(
    storedExpensePayerName,
  );
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState(
    storedBeneficiariesNames,
  );

  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.put(`${apiUrl}/expenses/${expenseId}`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerName,
        expenseBeneficiariesNames: selectedBeneficiaries,
        storedExpensePayerName,
        storedBeneficiariesNames,
      });

      changeFixedDebitorCreditorOrderSetting(groupCode, false);
      devLog("Expense updated:", response);
      navigate(route);
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "expenses", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error updating expense:", error);
        displayErrorModal();
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <ExpenseDescriptionInput
          value={expenseDescription}
          onDescriptionChange={setExpenseDescription}
          setFormChanged={setFormChanged}
          isUpdate
        />
        <ExpenseAmountInput
          value={expenseAmount}
          onAmountChange={setExpenseAmount}
          setFormChanged={setFormChanged}
          isUpdate
        />
        <ExpensePayerSelect
          expensePayerName={expensePayerName}
          onPayerChange={setExpensePayerName}
          groupMembers={groupMembers}
          setFormChanged={setFormChanged}
          isUpdate
        />
        <div className={styles.beneficiaries}>
          <ExpenseBeneficiariesInput
            selectedBeneficiaries={selectedBeneficiaries}
            groupMembers={groupMembers}
            onSelectedBeneficiariesChange={setSelectedBeneficiaries}
            setFormChanged={setFormChanged}
            isUpdate
          />
        </div>
        {formChanged && (
          <Button style={buttonStyles} variant='contained' type='submit'>
            {t("update-expense-button-text")}
          </Button>
        )}
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default UpdateExpense;
