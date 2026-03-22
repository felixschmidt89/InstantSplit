import { Schema, model } from 'mongoose';

import SETTLEMENT from '../../shared/constants/models/settlementConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';

const { FIELDS, TYPE_VALUE } = SETTLEMENT;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;

const settlementSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: DEFINITIONS.STRING,
      default: TYPE_VALUE,
      immutable: DEFINITIONS.TRUE,
    },
    [FIELDS.DEBTOR]: {
      type: DEFINITIONS.OBJECT_ID,
      ref: MODEL_NAMES.MEMBER,
      required: [DEFINITIONS.TRUE, 'Settlement requires a valid debtor ID'],
    },
    [FIELDS.CREDITOR]: {
      type: DEFINITIONS.OBJECT_ID,
      ref: MODEL_NAMES.MEMBER,
      required: [DEFINITIONS.TRUE, 'Settlement requires a valid creditor ID'],
    },
    [FIELDS.AMOUNT]: {
      type: DEFINITIONS.NUMBER,
      required: DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: DEFINITIONS.STRING,
      required: DEFINITIONS.TRUE,
      trim: DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
  },
);

export default model(MODEL_NAMES.SETTLEMENT, settlementSchema);
