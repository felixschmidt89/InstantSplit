import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { buttonStyles } from "@client-constants/stylesConstants";
import { devLog, handleApiErrors } from "@client-utils/errorUtils";
import { changeFixedDebitorCreditorOrderSetting } from "@client-utils/settlementUtils";
import { ROUTES } from "@client-constants/routesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import ExpenseBeneficiariesInput from "@components/Expenses/ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ExpenseAmountInput from "@components/Expenses/ExpenseAmountInput/ExpenseAmountInput";
import ExpenseDescriptionInput from "@components/Expenses/ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpensePayerSelect from "@components/Expenses/ExpensePayerSelect/ExpensePayerSelect";
import ErrorModal from "@components/ErrorModal/ErrorModal";

import styles from "./CreateExpense.module.css";

import { API_URL } from "@client-constants/apiConstants";

const CreateExpense = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayerName, setExpensePayerName] = useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/expenses`, {
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
      if (error?.response) {
        handleApiErrors(error, setError, "expenses", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error creating expense:", error);
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
