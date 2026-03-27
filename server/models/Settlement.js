import { Schema, model } from 'mongoose';
import SETTLEMENT_CONSTANTS from '../../shared/constants/models/settlementConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../shared/constants/system/errorConstants.js';

const { SETTLEMENT_FIELDS, SETTLEMENT_TYPE } = SETTLEMENT_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON_CONSTANTS;

const settlementSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: String,
      default: SETTLEMENT_TYPE,
      immutable: true,
    },
    [SETTLEMENT_FIELDS.DEBTOR]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [true, ERROR_CODES.MEMBER.NOT_FOUND],
    },
    [SETTLEMENT_FIELDS.CREDITOR]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [true, ERROR_CODES.MEMBER.NOT_FOUND],
    },
    [SETTLEMENT_FIELDS.AMOUNT]: {
      type: Number,
      required: [true, ERROR_CODES.PAYMENT.AMOUNT_REQUIRED],
      min: [
        COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
        ERROR_CODES.PAYMENT.AMOUNT_TOO_LOW,
      ],
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model(COMMON_MODEL_NAMES.SETTLEMENT, settlementSchema);
