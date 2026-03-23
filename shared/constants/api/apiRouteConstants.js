const API_ROUTES = {
  URL_PARAMS: {
    GROUP_ID: "groupId",
    EXPENSE_ID: "expenseId",
    MEMBER_ID: "memberId",
  },

  GROUPS: {
    BASE: "groups",
    TRANSACTIONS: "transactions",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
    HAS_PERSISTED_ORDER: "has-persisted-order",
    PERSISTED_ORDER: "persisted-order",
    DATA_PURGE: "data-purge",
  },

  MEMBERS: {
    BASE: "members",
    BY_GROUP: "by-group",
    TRANSACTIONS: "expenses-and-payments",
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
  },

  HEALTH: {
    BASE: "health",
  },
  CAPTCHAS: {
    BASE: "captchas",
  },
};

export default API_ROUTES;
