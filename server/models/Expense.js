import { Schema, model } from 'mongoose';
import EXPENSE_CONSTANTS from '../../shared/constants/models/expenseConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';

const { EXPENSE_FIELDS, EXPENSE_TYPE_VALUE } = EXPENSE_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS, COMMON_DEFINITIONS } =
  COMMON_CONSTANTS;

const expenseSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: COMMON_DEFINITIONS.STRING,
      default: EXPENSE_TYPE_VALUE,
      immutable: COMMON_DEFINITIONS.TRUE,
    },
    [EXPENSE_FIELDS.DESCRIPTION]: {
      type: COMMON_DEFINITIONS.STRING,
      trim: COMMON_DEFINITIONS.TRUE,
      required: COMMON_DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.DESCRIPTION_MIN_LENGTH,
      maxlength: COMMON_LIMITS.DESCRIPTION_MAX_LENGTH,
    },
    [EXPENSE_FIELDS.AMOUNT]: {
      type: COMMON_DEFINITIONS.NUMBER,
      required: COMMON_DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: {
      type: COMMON_DEFINITIONS.NUMBER,
      required: COMMON_DEFINITIONS.TRUE,
    },
    [EXPENSE_FIELDS.PAYER]: {
      type: COMMON_DEFINITIONS.OBJECT_ID,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: COMMON_DEFINITIONS.TRUE,
    },
    [EXPENSE_FIELDS.BENEFICIARIES]: [
      {
        type: COMMON_DEFINITIONS.OBJECT_ID,
        ref: COMMON_MODEL_NAMES.MEMBER,
        required: COMMON_DEFINITIONS.TRUE,
      },
    ],
    [COMMON_FIELDS.GROUP_CODE]: {
      type: COMMON_DEFINITIONS.STRING,
      required: COMMON_DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: COMMON_DEFINITIONS.TRUE,
  },
);

export default model(COMMON_MODEL_NAMES.EXPENSE, expenseSchema);
