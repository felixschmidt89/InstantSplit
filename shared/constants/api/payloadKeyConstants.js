const STORED_GROUP_CODES = "storedGroupCodes";

const MEMBER_KEYS = {
  MEMBER_NAME: "memberName",
  GROUP_CODE: "groupCode",
  NEW_NAME: "newName",
};

const EXPENSE_KEYS = {
  DESCRIPTION: "expenseDescription",
  AMOUNT: "expenseAmount",
  DATE: "expenseDate",
  PAYER: "expensePayerId",
  BENEFICIARIES: "expenseBeneficiariesIds",
};

const GROUP_KEYS = {
  NAME: "groupName",
  CURRENCY: "groupCurrency",
};

const SETTLEMENT_KEYS = {
  SETTLEMENTS: "settlements",
  DEBTOR: "debtorId",
  CREDITOR: "creditorId",
  AMOUNT: "settlementAmount",
};

const PAYLOAD_KEYS = {
  STORED_GROUP_CODES,
  MEMBER_KEYS,
  EXPENSE_KEYS,
  GROUP_KEYS,
  SETTLEMENT_KEYS,
};

export default PAYLOAD_KEYS;
