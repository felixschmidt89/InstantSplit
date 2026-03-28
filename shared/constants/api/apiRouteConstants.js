const API_ROUTES = {
  URL_PARAMS: {
    GROUP_ID: "groupId",
    EXPENSE_ID: "expenseId",
    MEMBER_ID: "memberId",
  },

  GROUPS: {
    BASE: "groups",
    TRANSACTIONS: "transactions",
    VALIDATE_GROUP_EXISTENCE: "validate-group-existence",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
    HAS_PERSISTED_ORDER: "has-persisted-order",
    PERSISTED_ORDER: "persisted-order",
    DATA_PURGE: "data-purge",
  },

  MEMBERS: {
    BASE: "members",
    BY_GROUP: "by-group",
    //TODO: use transactions term throughout application
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
  },

  HEALTH: {
    BASE: "health",
  },
  //TODO: delete captchas
  CAPTCHAS: {
    BASE: "captchas",
  },
};

export default API_ROUTES;
