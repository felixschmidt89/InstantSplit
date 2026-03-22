import { Schema, model } from 'mongoose';
import EXPENSE from '../../shared/constants/models/expenseConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';

const { FIELDS, TYPE_VALUE } = EXPENSE;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;

const expenseSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: DEFINITIONS.STRING,
      default: TYPE_VALUE,
      immutable: DEFINITIONS.TRUE,
    },
    [FIELDS.DESCRIPTION]: {
      type: DEFINITIONS.STRING,
      trim: DEFINITIONS.TRUE,
      required: DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.DESCRIPTION_MIN_LENGTH,
      maxlength: COMMON_LIMITS.DESCRIPTION_MAX_LENGTH,
    },
    [FIELDS.AMOUNT]: {
      type: DEFINITIONS.NUMBER,
      required: DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [FIELDS.AMOUNT_PER_BENEFICIARY]: {
      type: DEFINITIONS.NUMBER,
      required: DEFINITIONS.TRUE,
    },
    [FIELDS.PAYER]: {
      type: DEFINITIONS.OBJECT_ID,
      ref: MODEL_NAMES.MEMBER,
      required: DEFINITIONS.TRUE,
    },
    [FIELDS.BENEFICIARIES]: [
      {
        type: DEFINITIONS.OBJECT_ID,
        ref: MODEL_NAMES.MEMBER,
        required: DEFINITIONS.TRUE,
      },
    ],
    [COMMON_FIELDS.GROUP_CODE]: {
      type: DEFINITIONS.STRING,
      required: DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
  },
);

export default model(MODEL_NAMES.EXPENSE, expenseSchema);
