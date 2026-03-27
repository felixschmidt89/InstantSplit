import { Schema, model } from 'mongoose';
import PAYMENT_CONSTANTS from '../../shared/constants/models/paymentConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';

const { PAYMENT_FIELDS, PAYMENT_TYPE } = PAYMENT_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON_CONSTANTS;

const paymentSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: String,
      default: PAYMENT_TYPE,
      immutable: true,
    },
    [PAYMENT_FIELDS.AMOUNT]: {
      type: Number,
      required: true,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [PAYMENT_FIELDS.MAKER]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: true,
    },
    [PAYMENT_FIELDS.RECIPIENT]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: true,
    },
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

export default model(COMMON_MODEL_NAMES.PAYMENT, paymentSchema);
