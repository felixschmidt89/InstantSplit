import { Schema, model } from 'mongoose';
import PAYMENT_CONSTANTS from '../../shared/constants/models/paymentConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';

const { PAYMENT_FIELDS, PAYMENT_TYPE_VALUE } = PAYMENT_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS, COMMON_DEFINITIONS } =
  COMMON_CONSTANTS;

const paymentSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: COMMON_DEFINITIONS.STRING,
      default: PAYMENT_TYPE_VALUE,
      immutable: COMMON_DEFINITIONS.TRUE,
    },
    [PAYMENT_FIELDS.AMOUNT]: {
      type: COMMON_DEFINITIONS.NUMBER,
      required: COMMON_DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [PAYMENT_FIELDS.MAKER]: {
      type: COMMON_DEFINITIONS.OBJECT_ID,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: COMMON_DEFINITIONS.TRUE,
    },
    [PAYMENT_FIELDS.RECIPIENT]: {
      type: COMMON_DEFINITIONS.OBJECT_ID,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: COMMON_DEFINITIONS.TRUE,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: COMMON_DEFINITIONS.STRING,
      required: COMMON_DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: COMMON_DEFINITIONS.TRUE,
  },
);

export default model(COMMON_MODEL_NAMES.PAYMENT, paymentSchema);
