import { Schema, model } from 'mongoose';
import GROUP_CONSTANTS from '../../shared/constants/models/groupConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import { DEFAULT_CURRENCY } from '../../shared/constants/domain/currencyConstants.js';

const { GROUP_FIELDS, GROUP_TYPE_VALUE } = GROUP_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS, COMMON_DEFINITIONS } =
  COMMON_CONSTANTS;

const groupSchema = new Schema(
  {
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: COMMON_DEFINITIONS.STRING,
      default: GROUP_TYPE_VALUE,
      immutable: COMMON_DEFINITIONS.TRUE,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: COMMON_DEFINITIONS.STRING,
      required: COMMON_DEFINITIONS.TRUE,
      index: COMMON_DEFINITIONS.TRUE,
    },
    [GROUP_FIELDS.NAME]: {
      type: COMMON_DEFINITIONS.STRING,
      trim: COMMON_DEFINITIONS.TRUE,
      required: COMMON_DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
      index: COMMON_DEFINITIONS.TRUE,
    },
    [GROUP_FIELDS.CURRENCY]: {
      type: COMMON_DEFINITIONS.STRING,
      default: DEFAULT_CURRENCY,
    },
    [GROUP_FIELDS.LAST_ACTIVE]: {
      type: COMMON_DEFINITIONS.DATE,
      default: COMMON_DEFINITIONS.NOW,
    },
    [GROUP_FIELDS.DATA_PURGE_ENABLED]: {
      type: COMMON_DEFINITIONS.BOOLEAN,
      default: COMMON_DEFINITIONS.TRUE,
    },
    [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: {
      type: COMMON_DEFINITIONS.BOOLEAN,
      default: COMMON_DEFINITIONS.FALSE,
    },
  },
  {
    timestamps: COMMON_DEFINITIONS.TRUE,
  },
);

export default model(COMMON_MODEL_NAMES.GROUP, groupSchema);
