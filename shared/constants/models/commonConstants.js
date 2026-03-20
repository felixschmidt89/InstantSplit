import { Schema } from "mongoose";

const MODEL_NAMES = {
  GROUP: "Group",
  MEMBER: "Member",
  EXPENSE: "Expense",
  PAYMENT: "Payment",
};

const FIELDS = {
  ID: "_id",
  GROUP_CODE: "groupCode",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
};

const DEFINITIONS = {
  TRUE: true,
  FALSE: false,
  STRING: String,
  NUMBER: Number,
  BOOLEAN: Boolean,
  DATE: Date,
  NOW: Date.now,
  OBJECT_ID: Schema.Types.ObjectId,
};

const COMMON = {
  MODEL_NAMES,
  FIELDS,
  DEFINITIONS,
};

export default COMMON;
