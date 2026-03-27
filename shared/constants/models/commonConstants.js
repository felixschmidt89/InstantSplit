const COMMON = {
  COMMON_MODEL_NAMES: {
    GROUP: "Group",
    MEMBER: "Member",
    EXPENSE: "Expense",
    PAYMENT: "Payment",
    SETTLEMENT: "Settlement",
  },

  COMMON_FIELDS: {
    ID: "_id",
    GROUP_CODE: "groupCode",
    TRANSACTION_TYPE: "transactionType",
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
  },

  COMMON_LIMITS: {
    TRANSACTION_AMOUNT_MIN: 0.01,
    TRANSACTION_AMOUNT_MAX: 99999.99,
    DESCRIPTION_MIN_LENGTH: 1,
    DESCRIPTION_MAX_LENGTH: 50,
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 30,
  },
};

export default COMMON;
