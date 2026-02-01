export const LOG_LEVELS = {
  INFO: "info",
  SUCCESS: "success",
  WARN: "warn",
  ERROR: "error",
  DEBUG: "debug",
};

export const LOG_SOURCES = {
  CLIENT: "client",
  SERVER: "server",
};

export const DEBUG_MESSAGES = {
  CONTROLLER: {
    FETCHING_TRANSACTIONS: "Controller: Fetching transactions",
    TRANSACTIONS_RETRIEVED: "Controller: Transactions retrieved",
    FETCH_FAILED: "Controller: Failed to retrieve transactions",
  },
  API: {
    FETCHING: "Fetching transactions for group",
    DATA_RECEIVED: "Transactions data received:",
    ERROR: "Failed to fetch transactions",
  },
};
