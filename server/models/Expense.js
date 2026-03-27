import { Schema, model } from 'mongoose';
import EXPENSE_CONSTANTS from '../../shared/constants/models/expenseConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../shared/constants/system/errorConstants.js';

const { EXPENSE_FIELDS, EXPENSE_TYPE } = EXPENSE_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON_CONSTANTS;

const expenseSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: String,
      default: EXPENSE_TYPE,
      immutable: true,
    },
    [EXPENSE_FIELDS.DESCRIPTION]: {
      type: String,
      trim: true,
      required: [true, ERROR_CODES.EXPENSE.DESCRIPTION_REQUIRED],
      minlength: [
        COMMON_LIMITS.DESCRIPTION_MIN_LENGTH,
        ERROR_CODES.EXPENSE.DESCRIPTION_TOO_SHORT,
      ],
      maxlength: [
        COMMON_LIMITS.DESCRIPTION_MAX_LENGTH,
        ERROR_CODES.EXPENSE.DESCRIPTION_TOO_LONG,
      ],
    },
    [EXPENSE_FIELDS.AMOUNT]: {
      type: Number,
      required: [true, ERROR_CODES.EXPENSE.AMOUNT_REQUIRED],
      min: [
        COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
        ERROR_CODES.EXPENSE.AMOUNT_TOO_LOW,
      ],
      max: [
        COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
        ERROR_CODES.EXPENSE.AMOUNT_TOO_HIGH,
      ],
    },
    [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: {
      type: Number,
      required: [true, ERROR_CODES.EXPENSE.AMOUNT_PER_BENEFICIARY_REQUIRED],
    },
    [EXPENSE_FIELDS.PAYER]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [true, ERROR_CODES.EXPENSE.PAYER_REQUIRED],
    },
    [EXPENSE_FIELDS.BENEFICIARIES]: [
      {
        type: Schema.Types.ObjectId,
        ref: COMMON_MODEL_NAMES.MEMBER,
        required: [true, ERROR_CODES.EXPENSE.BENEFICIARY_REQUIRED],
      },
    ],
    [COMMON_FIELDS.GROUP_CODE]: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model(COMMON_MODEL_NAMES.EXPENSE, expenseSchema);
