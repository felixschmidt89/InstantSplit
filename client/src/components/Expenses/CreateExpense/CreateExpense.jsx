import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./CreateExpense.module.css";
import useAppNavigate from "../../../hooks/useAppNavigate.jsx";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility.jsx";
import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";
import { TO } from "../../../constants/navigationConstants";
import { buttonStyles } from "../../../constants/stylesConstants.jsx";
import { useGroupContext } from "../../../context/GroupContext";

import { createExpense } from "../../../api/expenses/createExpense.js";

import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput.jsx";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput.jsx";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect.jsx";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput.jsx";
import ErrorModal from "../../ErrorModal/ErrorModal.jsx";

const { LOG_ERROR } = LOG_LEVELS;
const { INSTANT_SPLIT } = TO;

const CreateExpense = ({ groupCode }) => {
  const navigate = useAppNavigate();
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { groupMembers } = useGroupContext();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayer, setExpensePayer] = useState(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hasMembers = groupMembers && groupMembers.length > 0;
    if (hasMembers) {
      setSelectedBeneficiaries(groupMembers);
    }
  }, [groupMembers]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const isPayerMissing = !expensePayer || !expensePayer._id;
    const isBeneficiaryMissing = selectedBeneficiaries.length === 0;

    if (isPayerMissing) {
      setError(t("expense-payer-required-error"));
      displayErrorModal();
      return;
    }

    if (isBeneficiaryMissing) {
      setError(t("expense-beneficiaries-required-error"));
      displayErrorModal();
      return;
    }

    try {
      const amount = parseFloat(expenseAmount);
      const amountPerBeneficiary = amount / selectedBeneficiaries.length;

      const payload = {
        expenseDescription,
        expenseAmount: amount,
        expenseAmountPerBeneficiary: amountPerBeneficiary,
        groupCode,
        expensePayerId: expensePayer._id,
        expenseBeneficiaryIds: selectedBeneficiaries.map(
          (beneficiary) => beneficiary._id,
        ),
      };

      await createExpense(payload);

      navigate(INSTANT_SPLIT);
    } catch (error) {
      debugLog("Error creating expense", { error: error.message }, LOG_ERROR);

      const apiErrorMessage = error?.response?.data?.message;
      if (apiErrorMessage) {
        setError(apiErrorMessage);
      } else {
        setError(t("generic-error-message"));
      }
      displayErrorModal();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <ExpenseDescriptionInput
          value={expenseDescription}
          onDescriptionChange={setExpenseDescription}
        />

        <ExpenseAmountInput
          value={expenseAmount}
          onAmountChange={setExpenseAmount}
        />

        <ExpensePayerSelect
          expensePayer={expensePayer}
          onPayerChange={setExpensePayer}
          groupMembers={groupMembers}
        />

        <ExpenseBeneficiariesInput
          expenseBeneficiaries={selectedBeneficiaries}
          setExpenseBeneficiaries={setSelectedBeneficiaries}
          groupMembers={groupMembers}
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
