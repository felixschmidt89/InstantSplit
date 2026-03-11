export const API_ROUTES = {
  URL_PARAMS: {
    GROUP_ID: "groupId",
    EXPENSE_ID: "expenseId",
    USER_ID: "userId",
  },

  GROUPS: {
    BASE: "groups",
    TRANSACTIONS: "transactions",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    VALIDATE_GROUP_EXISTENCE_LIMITED: "limited-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
    HAS_PERSISTED_ORDER: "has-persisted-order",
    PERSISTED_ORDER: "persisted-order",
    DATA_PURGE: "data-purge",
  },

  USERS: {
    BASE: "users",
    BY_GROUP: "by-group",
    TRANSACTIONS: "expenses-and-payments",
  },

  EXPENSES: {
    BASE: "expenses",
    TOTAL: "total-expenses",
    BY_GROUP: "by-group",
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
  FILES: {
    BASE: "files",
  },
  CAPTCHAS: {
    BASE: "captchas",
  },
};
