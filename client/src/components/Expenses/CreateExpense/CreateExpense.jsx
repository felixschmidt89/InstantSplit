import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./CreateExpense.module.css";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import LOG_LEVELS from "../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";

import NAV_LINKS from "../../../constants/clientRouteLinks.js";
import STYLES_OBJECT from "../../../constants/stylesConstants.jsx";
import { useGroupContext } from "../../../context/GroupContext";

import createExpense from "../../../api/expenses/createExpense.js";

import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput.jsx";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput.jsx";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect.jsx";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput.jsx";

const { LOG_ERROR } = LOG_LEVELS;
const { STATIC: TO } = NAV_LINKS;
const { INSTANT_SPLIT } = TO;
const { buttonStyles } = STYLES_OBJECT;

const CreateExpense = ({ groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useGlobalError();

  const { groupMembers } = useGroupContext();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayer, setExpensePayer] = useState(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);

  useEffect(() => {
    const hasMembers = groupMembers && groupMembers.length > 0;
    if (hasMembers) {
      setSelectedBeneficiaries(groupMembers);
    }
  }, [groupMembers]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isPayerMissing = !expensePayer || !expensePayer._id;
    const isBeneficiaryMissing = selectedBeneficiaries.length === 0;

    if (isPayerMissing) {
      showError(t("expense-payer-required-error"));
      return;
    }

    if (isBeneficiaryMissing) {
      showError(t("expense-beneficiaries-required-error"));
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
    } catch (apiError) {
      debugLog(
        "Error creating expense",
        { error: apiError.message },
        LOG_ERROR,
      );

      const apiErrorMessage = apiError?.response?.data?.message;
      showError(apiErrorMessage || t("generic-error-message"));
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
    </div>
  );
};

export default CreateExpense;
