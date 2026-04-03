const URL_PARAMS = {
  GROUP_ID: "groupId",
  EXPENSE_ID: "expenseId",
  MEMBER_ID: "memberId",
  PAYMENT_ID: "paymentId",
  SETTLEMENT_ID: "settlementId",
};

const GROUPS = {
  BASE: "groups",
  TRANSACTIONS: "transactions",
  CHECK_GROUP_CODE: "check-group-code",
  STORED_GROUP_NAMES: "stored-group-names",
  CURRENCY: "currency",
  SETTLEMENTS_CALCULATED: "settlements-calculated",
  DATA_PURGE: "data-purge",
};

const MEMBERS = {
  BASE: "members",
  TRANSACTIONS: "transactions",
};

const EXPENSES = {
  BASE: "expenses",
  GROUP_TOTAL: "group-total",
  GROUP_LIST: "group-list",
};

const PAYMENTS = {
  BASE: "payments",
};

const SETTLEMENTS = {
  BASE: "settlements",
  CALCULATE: "calculate",
};

const HEALTH = {
  BASE: "health",
  CHECK: "check",
};

const API_ROUTES = {
  URL_PARAMS,
  GROUPS,
  MEMBERS,
  EXPENSES,
  PAYMENTS,
  SETTLEMENTS,
  HEALTH,
};

export default API_ROUTES;
