import { Schema, model } from 'mongoose';

import PAYMENT from '../../shared/constants/models/paymentConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';

const { FIELDS, TYPE_VALUE } = PAYMENT;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;

const paymentSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: DEFINITIONS.STRING,
      default: TYPE_VALUE,
      immutable: DEFINITIONS.TRUE,
    },
    [FIELDS.AMOUNT]: {
      type: DEFINITIONS.NUMBER,
      required: DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [FIELDS.MAKER]: {
      type: DEFINITIONS.OBJECT_ID,
      ref: MODEL_NAMES.MEMBER,
      required: DEFINITIONS.TRUE,
    },
    [FIELDS.RECIPIENT]: {
      type: DEFINITIONS.OBJECT_ID,
      ref: MODEL_NAMES.MEMBER,
      required: DEFINITIONS.TRUE,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: DEFINITIONS.STRING,
      required: DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
  },
);

export default model(MODEL_NAMES.PAYMENT, paymentSchema);
