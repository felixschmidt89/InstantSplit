import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./UpdateExpense.module.css";
import { ROUTES } from "../../../constants/routesConstants";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { API_URL } from "../../../constants/apiConstants";
import { changeFixedDebitorCreditorOrderSetting } from "../../../utils/settlementUtils";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import { buttonStyles } from "../../../constants/stylesConstants";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ErrorModal from "../../ErrorModal/ErrorModal";
import { useGroupMembersContext } from "../../../context/GroupMembersContext";

const UpdateExpense = ({
  expenseInfo,
  groupCode,
  expenseId,
  route = ROUTES.INSTANT_SPLIT,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { groupMembers } = useGroupMembersContext();

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

  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`${API_URL}/expenses/${expenseId}`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerId: expensePayer?._id,
        expenseBeneficiaryIds: selectedBeneficiaries.map((b) => b._id),
        storedExpensePayerId: storedExpensePayer?._id,
        storedExpenseBeneficiaryIds: storedBeneficiaries?.map((b) => b._id),
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
          expensePayer={expensePayer}
          onPayerChange={setExpensePayer}
          groupMembers={groupMembers}
          setFormChanged={setFormChanged}
          isUpdate
        />

        <div className={styles.beneficiaries}>
          <ExpenseBeneficiariesInput
            expenseBeneficiaries={selectedBeneficiaries}
            setExpenseBeneficiaries={setSelectedBeneficiaries}
            groupMembers={groupMembers}
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
