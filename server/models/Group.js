import { Schema, model } from 'mongoose';

import GROUP from '../../shared/constants/models/groupConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';
import { DEFAULT_CURRENCY } from '../../shared/constants/domain/currencyConstants.js';

const { FIELDS } = GROUP;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;

const groupSchema = new Schema(
  {
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
    [FIELDS.INACTIVE_DATA_PURGE]: {
      type: DEFINITIONS.BOOLEAN,
      default: DEFINITIONS.TRUE,
    },
    [FIELDS.FIXED_DEBTOR_CREDITOR_ORDER]: {
      type: DEFINITIONS.BOOLEAN,
      default: DEFINITIONS.FALSE,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
  },
);

export default model(MODEL_NAMES.GROUP, groupSchema);
