const FIELDS = {
  DESCRIPTION: "expenseDescription",
  AMOUNT: "expenseAmount",
  AMOUNT_PER_BENEFICIARY: "expenseAmountPerBeneficiary",
  PAYER: "expensePayer",
  BENEFICIARIES: "expenseBeneficiaries",
};

const LIMITS = {
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 100,
  AMOUNT_MIN: 0.01,
  AMOUNT_MAX: 99999.99,
};

const EXPENSE = {
  FIELDS,
  LIMITS,
};

export default EXPENSE;
