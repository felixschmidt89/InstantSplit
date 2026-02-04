export const API_ROUTES = {
  URL_PARAMS: {
    GROUP_CODE: ":groupCode",
    GROUP_ID: ":groupId",
  },

  GROUPS: {
    BASE: "groups",
    TRANSACTIONS: "expenses-and-payments",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    VALIDATE_GROUP_EXISTENCE_LIMITED: "limited-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
  },

  USERS: {
    BASE: "users",
    BY_GROUP_CODE: "byGroupCode",
  },

  EXPENSES: {
    BASE: "expenses",
  },

  PAYMENTS: {
    BASE: "payments",
  },

  SETTLEMENTS: {
    BASE: "settlements",
  },

  FEEDBACKS: {
    BASE: "feedbacks",
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
