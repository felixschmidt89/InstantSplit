import { Schema, model } from 'mongoose';

import EXPENSE from '../../shared/constants/models/expenseConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';

const { FIELDS: EXPENSE_FIELDS, LIMITS: EXPENSE_LIMITS } = EXPENSE;
const { DESCRIPTION, AMOUNT, AMOUNT_PER_BENEFICIARY, PAYER, BENEFICIARIES } =
  EXPENSE_FIELDS;

const {
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  AMOUNT_MIN,
  AMOUNT_MAX,
} = EXPENSE_LIMITS;

const { FIELDS: COMMON_FIELDS, DEFINITIONS, MODEL_NAMES } = COMMON;
const { GROUP_CODE } = COMMON_FIELDS;
const { NUMBER, STRING, OBJECT_ID, TRUE } = DEFINITIONS;
const { EXPENSE: MODEL_EXPENSE, MEMBER } = MODEL_NAMES;

const expenseSchema = new Schema(
  {
    [DESCRIPTION]: {
      type: STRING,
      trim: TRUE,
      required: TRUE,
      minlength: DESCRIPTION_MIN_LENGTH,
      maxlength: DESCRIPTION_MAX_LENGTH,
    },
    [AMOUNT]: {
      type: NUMBER,
      required: TRUE,
      min: AMOUNT_MIN,
      max: AMOUNT_MAX,
    },
    [AMOUNT_PER_BENEFICIARY]: {
      type: NUMBER,
      required: TRUE,
    },
    [PAYER]: {
      type: OBJECT_ID,
      ref: MEMBER,
      required: TRUE,
    },
    [BENEFICIARIES]: [
      {
        type: OBJECT_ID,
        ref: MEMBER,
        required: TRUE,
      },
    ],
    [GROUP_CODE]: {
      type: STRING,
      required: TRUE,
    },
  },
  {
    timestamps: TRUE,
  },
);

const Expense = model(MODEL_EXPENSE, expenseSchema);

export default Expense;
