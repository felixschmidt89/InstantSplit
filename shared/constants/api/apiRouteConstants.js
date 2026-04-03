const API_ROUTES = {
  URL_PARAMS: {
    GROUP_ID: "groupId",
    EXPENSE_ID: "expenseId",
    MEMBER_ID: "memberId",
    PAYMENT_ID: "paymentId",
    SETTLEMENT_ID: "settlementId",
  },

  GROUPS: {
    BASE: "groups",
    TRANSACTIONS: "transactions",
    CHECK_GROUP_CODE: "check-group-code",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
    SETTLEMENTS_CALCULATED: "settlements-calculated",
    DATA_PURGE: "data-purge",
  },

  MEMBERS: {
    BASE: "members",
    BY_GROUP: "by-group",
    TRANSACTIONS: "transactions",
  },

  EXPENSES: {
    BASE: "expenses",
    GROUP_TOTAL: "group-total",
    GROUP_LIST: "group-list",
  },

  PAYMENTS: {
    BASE: "payments",
  },

  SETTLEMENTS: {
    BASE: "settlements",
    CALCULATE: "calculate",
  },

  HEALTH: {
    BASE: "health",
    CHECK: "check",
  },
};

export default API_ROUTES;
