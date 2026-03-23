import { Schema, model } from 'mongoose';
import SETTLEMENT_CONSTANTS from '../../shared/constants/models/settlementConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';

const { SETTLEMENT_FIELDS, SETTLEMENT_TYPE_VALUE } = SETTLEMENT_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS, COMMON_DEFINITIONS } =
  COMMON_CONSTANTS;

const settlementSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: COMMON_DEFINITIONS.STRING,
      default: SETTLEMENT_TYPE_VALUE,
      immutable: COMMON_DEFINITIONS.TRUE,
    },
    [SETTLEMENT_FIELDS.DEBTOR]: {
      type: COMMON_DEFINITIONS.OBJECT_ID,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [
        COMMON_DEFINITIONS.TRUE,
        'Settlement requires a valid debtor ID',
      ],
    },
    [SETTLEMENT_FIELDS.CREDITOR]: {
      type: COMMON_DEFINITIONS.OBJECT_ID,
      ref: COMMON_MODEL_NAMES.MEMBER,
      required: [
        COMMON_DEFINITIONS.TRUE,
        'Settlement requires a valid creditor ID',
      ],
    },
    [SETTLEMENT_FIELDS.AMOUNT]: {
      type: COMMON_DEFINITIONS.NUMBER,
      required: COMMON_DEFINITIONS.TRUE,
      min: COMMON_LIMITS.TRANSACTION_AMOUNT_MIN,
      max: COMMON_LIMITS.TRANSACTION_AMOUNT_MAX,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: COMMON_DEFINITIONS.STRING,
      required: COMMON_DEFINITIONS.TRUE,
      trim: COMMON_DEFINITIONS.TRUE,
    },
  },
  {
    timestamps: COMMON_DEFINITIONS.TRUE,
  },
);

export default model(COMMON_MODEL_NAMES.SETTLEMENT, settlementSchema);
