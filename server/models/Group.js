import { Schema, model } from 'mongoose';
import GROUP_CONSTANTS from '../../shared/constants/models/groupConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import CURRENCY from '../../shared/constants/domain/currencyConstants.js';

const { GROUP_FIELDS } = GROUP_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON_CONSTANTS;
const { DEFAULT_CURRENCY } = CURRENCY;

const groupSchema = new Schema(
  {
    [COMMON_FIELDS.GROUP_CODE]: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    [GROUP_FIELDS.NAME]: {
      type: String,
      trim: true,
      required: true,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
      index: true,
    },
    [GROUP_FIELDS.CURRENCY]: {
      type: String,
      default: DEFAULT_CURRENCY,
    },
    [GROUP_FIELDS.LAST_ACTIVE]: {
      type: Date,
      default: Date.now,
    },
    [GROUP_FIELDS.DATA_PURGE_ENABLED]: {
      type: Boolean,
      default: true,
    },
    // TODO: Add functionality in FE and BE to enable payments feature
    [GROUP_FIELDS.PAYMENTS_ENABLED]: {
      type: Boolean,
      default: false,
    },
    [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: {
      type: Boolean,
      default: false,
    },
    // TODO: Replace fixedDebitorCreditorOrder with GROUP_FIELDS.SETTLEMENTS_CALCULATED where ever it had been used
  },
  {
    timestamps: true,
  },
);

export default model(COMMON_MODEL_NAMES.GROUP, groupSchema);
