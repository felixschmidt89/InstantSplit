export const MOCK_DATA = {
  STRING: "test_string_value",
  NUMBER: 123,
  BOOLEAN: true,
  OBJECT: { id: "mock_id_1", value: "mock_value" },
  ARRAY: ["item_1", "item_2"],
  EMAIL: "test@example.com",
  ID: "6976543dabc5a7097f50bb01",
  TIMESTAMP: 1737936000000, // 2026-01-27T00:00:00Z
};

export const MOCK_TIME = {
  NOW: MOCK_DATA.TIMESTAMP,
  ONE_HOUR_AGO: MOCK_DATA.TIMESTAMP - 3600000,
  TWENTY_FOUR_HOURS_AGO: MOCK_DATA.TIMESTAMP - 86400000,
  TWO_DAYS_AGO: MOCK_DATA.TIMESTAMP - 172800000,
};

export const MOCK_ERROR_MESSAGES = {
  SECURITY_ERROR: "Security error",
  STORAGE_FULL: "Storage full",
  ACCESS_DENIED: "Access denied",
  STORAGE_FAILURE: "Storage failure",
};

export const MOCK_LOCALSTORAGE_VALUES = {
  ACTIVE_GROUP_CODE: "NHMPSPAZ3SF8",
  STORED_GROUP_CODES: ["UVDL4D8MJT7T", "NHMPSPAZ3SF8"],
  NEW_TEST_GROUP_CODE: "K8J2L9M4P5Q1",
  LANGUAGE: "de",
  PREVIOUS_ROUTE: "/groupmember-details/NHMPSPAZ3SF8/6976543dabc5a7097f50bb01",
  NESTED_PREVIOUS_ROUTE:
    "/groupmember-transaction-history/NHMPSPAZ3SF8/6976543dabc5a7097f50bb01",
};

export const MOCK_STRINGS = {
  WITH_SLASHES: [
    {
      SLASHED: "/groupmember-details/NHMPSPAZ3SF8/6976543dabc5a7097f50bb01",
      DASHED: "-groupmember-details-NHMPSPAZ3SF8-6976543dabc5a7097f50bb01",
    },
  ],
  WITHOUT_SLASHES: [
    {
      SLASHED: "no_slashes_here",
      DASHED: "no_slashes_here",
    },
  ],
};

export const MOCK_LOG_METHODS = {
  LOG: "log",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
};

export const MOCK_LOGS = {
  DEFAULT_MESSAGE: "debug",
  TEST_MESSAGE: "test_log_message",
  ERROR_MESSAGE: "api_failure_context",
  MOCK_ERROR: new Error("mock_internal_error"),
};

export const MOCK_API_URL = "http://localhost:5000/api";

export const MOCK_GROUP_DATA = {
  NAME: "New Test Group",
  CODE: MOCK_LOCALSTORAGE_VALUES.NEW_TEST_GROUP_CODE,
  ID: MOCK_DATA.ID,
};

export const MOCK_API_RESPONSES = {
  GROUPS: {
    CREATE_SUCCESS: {
      group: {
        groupName: MOCK_GROUP_DATA.NAME,
        groupCode: MOCK_GROUP_DATA.CODE,
        _id: MOCK_GROUP_DATA.ID,
      },
    },
  },
};

export const MOCK_API_ROUTES = {
  URL_PARAMS: {
    GROUP_CODE: ":groupCode",
    GROUP_ID: ":groupId",
  },
  GROUPS: {
    GROUPS_BASE: "groups",
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS: "continuous-validate-existence",
    VALIDATE_GROUP_EXISTENCE_LIMITED: "limited-validate-existence",
    STORED_GROUP_NAMES: "stored-group-names",
  },
  USERS: {
    USERS_BASE: "users",
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

export const MOCK_ENDPOINTS = {
  GROUPS: `/${MOCK_API_ROUTES.GROUPS.GROUPS_BASE}`,
  USERS: `/${MOCK_API_ROUTES.USERS.USERS_BASE}`,
  EXPENSES: `/${MOCK_API_ROUTES.EXPENSES.EXPENSES_BASE}`,
  PAYMENTS: `/${MOCK_API_ROUTES.PAYMENTS.PAYMENTS_BASE}`,
  SETTLEMENTS: `/${MOCK_API_ROUTES.SETTLEMENTS.SETTLEMENTS_BASE}`,
};

export const MOCK_FULL_URLS = {
  GROUPS: `${MOCK_API_URL}${MOCK_ENDPOINTS.GROUPS}`,
  USERS: `${MOCK_API_URL}${MOCK_ENDPOINTS.USERS}`,
};
