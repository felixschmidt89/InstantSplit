import { Schema, model } from 'mongoose';
import SETTLEMENT from '../../shared/constants/models/settlementConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';

const { SETTLEMENT_FIELDS, SETTLEMENT_TYPE } = SETTLEMENT;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON;

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
      required: true,
    },
    [SETTLEMENT_FIELDS.CREDITOR]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: true,
    },
    [SETTLEMENT_FIELDS.AMOUNT]: {
      type: Number,
      required: true,
      min: [COMMON_LIMITS.TRANSACTION_AMOUNT_MIN],
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
