import { Schema, model } from 'mongoose';
import PAYMENT from '../../shared/constants/models/paymentConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../shared/constants/system/errorConstants.js';

const { PAYMENT_FIELDS, PAYMENT_TYPE } = PAYMENT;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON;
const { PAYMENT_ERRORS, MEMBER_ERRORS } = ERROR_CODES;

const paymentSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: String,
      default: PAYMENT_TYPE,
      immutable: true,
    },
    [PAYMENT_FIELDS.AMOUNT]: {
      type: Number,
      required: [true, PAYMENT_ERRORS.AMOUNT_REQUIRED],
      min: [
        COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
        PAYMENT_ERRORS.AMOUNT_TOO_LOW,
      ],
      max: [
        COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
        PAYMENT_ERRORS.AMOUNT_TOO_HIGH,
      ],
    },
    [PAYMENT_FIELDS.MAKER]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [true, MEMBER_ERRORS.NOT_FOUND],
    },
    [PAYMENT_FIELDS.RECIPIENT]: {
      type: Schema.Types.ObjectId,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [true, MEMBER_ERRORS.NOT_FOUND],
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: String,
      required: true,
      trim: true,
      index: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model(COMMON_MODEL_NAMES.PAYMENT, paymentSchema);
