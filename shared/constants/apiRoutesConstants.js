export const API_ROUTES = {
  URL_PARAMS: {
    GROUP_CODE: ":groupCode",
    GROUP_ID: ":groupId",
  },

  GROUPS: {
    GROUPS_BASE: "groups",
    TRANSACTIONS: "expenses-and-payments",
    CURRENCY: "currency",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    VALIDATE_GROUP_EXISTENCE_LIMITED: "limited-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
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
};
