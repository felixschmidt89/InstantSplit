import { Schema, model } from 'mongoose';

import GROUP from '../../shared/constants/models/groupConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';
import { DEFAULT_CURRENCY } from '../../shared/constants/domain/currencyConstants.js';

const { FIELDS, TYPE_VALUE } = GROUP;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;

const groupSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: DEFINITIONS.STRING,
      default: TYPE_VALUE,
      immutable: DEFINITIONS.TRUE,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: DEFINITIONS.STRING,
      required: DEFINITIONS.TRUE,
      index: DEFINITIONS.TRUE,
    },
    [FIELDS.NAME]: {
      type: DEFINITIONS.STRING,
      trim: DEFINITIONS.TRUE,
      required: DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
      index: DEFINITIONS.TRUE,
    },
    [FIELDS.CURRENCY]: {
      type: DEFINITIONS.STRING,
      default: DEFAULT_CURRENCY,
    },
    [FIELDS.LAST_ACTIVE]: {
      type: DEFINITIONS.DATE,
      default: DEFINITIONS.NOW,
    },
    [FIELDS.DATA_PURGE_ENABLED]: {
      type: DEFINITIONS.BOOLEAN,
      default: DEFINITIONS.TRUE,
    },
    [FIELDS.SETTLEMENTS_CALCULATED]: {
      type: DEFINITIONS.BOOLEAN,
      default: DEFINITIONS.FALSE,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
  },
);

export default model(MODEL_NAMES.GROUP, groupSchema);
