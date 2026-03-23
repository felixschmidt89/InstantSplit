import { Schema } from "mongoose";

const COMMON_MODEL_NAMES = {
  GROUP: "Group",
  MEMBER: "Member",
  EXPENSE: "Expense",
  PAYMENT: "Payment",
  SETTLEMENT: "Settlement",
};

const COMMON_FIELDS = {
  ID: "_id",
  GROUP_CODE: "groupCode",
  TRANSACTION_TYPE: "transactionType",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
};

const COMMON_LIMITS = {
  TRANSACTION_AMOUNT_MIN: 0.01,
  TRANSACTION_AMOUNT_MAX: 99999.99,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 30,
};

const COMMON_DEFINITIONS = {
  TRUE: true,
  FALSE: false,
  STRING: String,
  NUMBER: Number,
  BOOLEAN: Boolean,
  DATE: Date,
  NOW: Date.now,
  OBJECT_ID: Schema.Types.ObjectId,
};

const COMMON_CONSTANTS = {
  COMMON_MODEL_NAMES,
  COMMON_FIELDS,
  COMMON_LIMITS,
  COMMON_DEFINITIONS,
};

export default COMMON_CONSTANTS;
