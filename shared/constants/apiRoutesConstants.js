export const API_ROUTES = {
  URL_PARAMS: {
    GROUP_CODE: ":groupCode",
    GROUP_ID: ":groupId",
  },

  GROUPS: {
    GROUPS_BASE: "groups",
    TRANSACTIONS: "expenses-and-payments",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    VALIDATE_GROUP_EXISTENCE_LIMITED: "limited-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
    CURRENCY: "currency",
  },

  USERS: {
    USERS_BASE: "users",
    BY_GROUP_CODE: "byGroupCode",
  },

  EXPENSES: {
    EXPENSES_BASE: "expenses",
  },

  PAYMENTS: {
    PAYMENTS_BASE: "payments",
  },

  SETTLEMENTS: {
    SETTLEMENTS_BASE: "settlements",
  },

  FEEDBACKS: {
    FEEDBACKS_BASE: "feedbacks",
  },
  HEALTH: {
    HEALTH_BASE: "health",
  },
  FILES: {
    FILES_BASE: "files",
  },
  CAPTCHAS: {
    CAPTCHAS_BASE: "captchas",
  },
};
