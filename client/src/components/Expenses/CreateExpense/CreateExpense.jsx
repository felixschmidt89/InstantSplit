import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./CreateExpense.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility.jsx";
import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { changeFixedDebitorCreditorOrderSetting } from "../../../utils/settlementUtils.jsx";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../../constants/apiConstants.js";
import { ROUTES } from "../../../constants/routesConstants.jsx";
import { buttonStyles } from "../../../constants/stylesConstants.jsx";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput.jsx";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput.jsx";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect.jsx";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput.jsx";
import ErrorModal from "../../ErrorModal/ErrorModal.jsx";
import { useGroupMembersContext } from "../../../context/GroupMembersContext";

const { LOG_ERROR, INFO } = LOG_LEVELS;

const CreateExpense = ({ groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { groupMembers } = useGroupMembersContext();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayer, setExpensePayer] = useState(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (groupMembers?.length) {
      setSelectedBeneficiaries(groupMembers);
    }
  }, [groupMembers]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!expensePayer || !expensePayer._id) {
      setError(t("expense-payer-required-error"));
      displayErrorModal();
      return;
    }

    if (selectedBeneficiaries.length === 0) {
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
        expenseBeneficiaryIds: selectedBeneficiaries.map((b) => b._id),
      };

      debugLog("Creating expense payload", payload, INFO);

      const response = await axios.post(`${API_URL}/expenses`, payload);

      changeFixedDebitorCreditorOrderSetting(groupCode, false);
      debugLog("Expense created successfully", { id: response.data._id }, INFO);

      navigate(ROUTES.INSTANT_SPLIT);
    } catch (error) {
      debugLog("Error creating expense", { error: error.message }, LOG_ERROR);

      if (error?.response?.data?.message) {
        setError(error.response.data.message);
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
