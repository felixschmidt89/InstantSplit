import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../../../constants/stylesConstants";
import { devLog, handleApiErrors } from "../../../../utils/errorUtils";
import { changeFixedDebitorCreditorOrderSetting } from "../../../../utils/settlementUtils";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import { ROUTES } from "../../../../constants/routesConstants";
import styles from "./CreateExpense.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateExpense = ({ groupMembers, groupCode }) => {
  // TODO: for updates: active color should not be applied when value have not been changed, update button should also not be rendered then
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [expenseDescription, setExpenseDescription] = useState(null);
  const [expenseAmount, setExpenseAmount] = useState(null);
  const [expensePayerName, setExpensePayerName] = useState(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/expenses`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerName,
        expenseBeneficiariesNames: selectedBeneficiaries,
      });

      changeFixedDebitorCreditorOrderSetting(groupCode, false);
      devLog("Expense created:", response);

      navigate(ROUTES.INSTANT_SPLIT);
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "expenses", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error creating expense:", error);
        displayErrorModal();
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.container}>
          <ExpenseDescriptionInput
            value={expenseDescription}
            onDescriptionChange={setExpenseDescription}
          />
          <ExpenseAmountInput
            value={expenseAmount}
            onAmountChange={setExpenseAmount}
          />
          <ExpensePayerSelect
            expensePayerName={expensePayerName}
            onPayerChange={setExpensePayerName}
            groupMembers={groupMembers}
          />
          <ExpenseBeneficiariesInput
            selectedBeneficiaries={selectedBeneficiaries}
            groupMembers={groupMembers}
            onSelectedBeneficiariesChange={setSelectedBeneficiaries}
          />
          <Button style={buttonStyles} variant='contained' type='submit'>
            {t("create-expense-add-expense-button-text")}
          </Button>
        </div>
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default CreateExpense;
