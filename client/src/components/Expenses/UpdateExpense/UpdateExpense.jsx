import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { useGroupContext } from "../../../context/GroupContext";
import useAppNavigate from "../../../hooks/useAppNavigate";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { updateExpense } from "../../../api/expenses/updateExpense";
import { handleApiErrors } from "../../../utils/errorUtils";
import { buttonStyles } from "../../../constants/stylesConstants";
import { TO } from "../../../constants/navigationConstants";

import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ErrorModal from "../../ErrorModal/ErrorModal";

import styles from "./UpdateExpense.module.css";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

const { INSTANT_SPLIT } = TO;

const UpdateExpense = ({
  expenseInfo,
  groupCode,
  expenseId,
  navigateTo = INSTANT_SPLIT,
}) => {
  const navigate = useAppNavigate();
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { groupMembers } = useGroupContext();

  const storedExpenseDescription = expenseInfo?.expenseDescription;
  const storedExpenseAmount = expenseInfo?.expenseAmount;
  const storedExpensePayer = expenseInfo?.expensePayer;
  const storedBeneficiaries = expenseInfo?.expenseBeneficiaries;

  const [expenseDescription, setExpenseDescription] = useState(
    storedExpenseDescription,
  );
  const [expenseAmount, setExpenseAmount] = useState(storedExpenseAmount);
  const [expensePayer, setExpensePayer] = useState(storedExpensePayer);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState(
    storedBeneficiaries || [],
  );

  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const payload = {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerId: expensePayer?._id,
        expenseBeneficiaryIds: selectedBeneficiaries.map(
          (beneficiary) => beneficiary._id,
        ),
        storedExpensePayerId: storedExpensePayer?._id,
        storedExpenseBeneficiaryIds: storedBeneficiaries?.map(
          (beneficiary) => beneficiary._id,
        ),
      };

      await updateExpense(expenseId, payload);

      navigate(navigateTo);
    } catch (error) {
      if (error?.response) {
        handleApiErrors(error, setError, "expenses", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        debugLog("Error updating expense", { error: error.message });
        displayErrorModal();
      }
    }
  };

  const isSubmitButtonVisible = hasFormChanged;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <ExpenseDescriptionInput
          value={expenseDescription}
          onDescriptionChange={setExpenseDescription}
          setFormChanged={setHasFormChanged}
          isUpdate
        />

        <ExpenseAmountInput
          value={expenseAmount}
          onAmountChange={setExpenseAmount}
          setFormChanged={setHasFormChanged}
          isUpdate
        />

        <ExpensePayerSelect
          expensePayer={expensePayer}
          onPayerChange={setExpensePayer}
          groupMembers={groupMembers}
          setFormChanged={setHasFormChanged}
          isUpdate
        />

        <div className={styles.beneficiaries}>
          <ExpenseBeneficiariesInput
            expenseBeneficiaries={selectedBeneficiaries}
            setExpenseBeneficiaries={setSelectedBeneficiaries}
            groupMembers={groupMembers}
            setFormChanged={setHasFormChanged}
            isUpdate
          />
        </div>

        {isSubmitButtonVisible && (
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
