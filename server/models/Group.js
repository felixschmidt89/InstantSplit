import { Schema, model } from 'mongoose';

import { DEFAULT_CURRENCY } from '../../shared/constants/domain/currencyConstants.js';
import {
  COMMON_FIELDS,
  COMMON_DEFINITIONS,
  MODEL_NAMES,
} from '../../shared/constants/models/commonConstants.js';
import {
  GROUP_FIELDS,
  GROUP_LIMITS,
} from '../../shared/constants/models/groupConstants.js';

const { TRUE, FALSE, STRING, DATE, BOOLEAN, NOW } = COMMON_DEFINITIONS;
const { GROUP_CODE } = COMMON_FIELDS;
const { GROUP: GROUP_MODEL_NAME } = MODEL_NAMES;
const {
  GROUP_NAME,
  GROUP_CURRENCY,
  LAST_ACTIVE,
  INACTIVE_DATA_PURGE,
  FIXED_DEBITOR_CREDITOR_ORDER,
} = GROUP_FIELDS;
const { NAME_MIN_LENGTH, NAME_MAX_LENGTH } = GROUP_LIMITS;

const groupSchema = new Schema(
  {
    [GROUP_CODE]: {
      type: STRING,
      required: TRUE,
      index: TRUE,
    },
    [GROUP_NAME]: {
      type: STRING,
      trim: TRUE,
      required: TRUE,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
      index: TRUE,
    },
    [GROUP_CURRENCY]: {
      type: STRING,
      default: DEFAULT_CURRENCY,
    },
    [LAST_ACTIVE]: {
      type: DATE,
      default: NOW,
    },
    [INACTIVE_DATA_PURGE]: {
      type: BOOLEAN,
      default: TRUE,
    },
    [FIXED_DEBITOR_CREDITOR_ORDER]: {
      type: BOOLEAN,
      default: FALSE,
    },
  },
  {
    timestamps: TRUE,
  },
);

const Group = model(GROUP_MODEL_NAME, groupSchema);

export default Group;
