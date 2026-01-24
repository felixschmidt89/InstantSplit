import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { devLog, handleApiErrors } from "@client-utils/errorUtils";
import { buttonStyles } from "@client-constants/stylesConstants";
import { changeFixedDebitorCreditorOrderSetting } from "@client-utils/settlementUtils";
import { ROUTES } from "@client-constants/routesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import ExpenseDescriptionInput from "@components/Expenses/ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpenseAmountInput from "@components/Expenses/ExpenseAmountInput/ExpenseAmountInput";
import ExpensePayerSelect from "@components/Expenses/ExpensePayerSelect/ExpensePayerSelect";
import ExpenseBeneficiariesInput from "@components/Expenses/ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ErrorModal from "@components/ErrorModal/ErrorModal";

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
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const storedExpenseDescription = expenseInfo?.expenseDescription;
  const storedExpenseAmount = expenseInfo?.expenseAmount;
  const storedExpensePayerName = expenseInfo?.expensePayer?.userName;
  const storedBeneficiariesNames = expenseInfo?.expenseBeneficiaries?.map(
    (beneficiary) => beneficiary.userName,
  );

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
      if (error?.response) {
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
