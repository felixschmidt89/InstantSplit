import { Schema, model } from 'mongoose';

import { DEFAULT_CURRENCY } from '../../shared/constants/currencyConstants.js';
import { debugLog } from '#shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '#shared/constants/debugConstants.js';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: true,
      index: true,
    },
    groupName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30,
      index: true,
    },
    initialGroupName: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value.includes('/'),
      },
    },
    currency: {
      type: String,
      default: DEFAULT_CURRENCY,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    inactiveDataPurge: {
      type: Boolean,
      default: true,
    },
    fixedDebitorCreditorOrder: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

groupSchema.methods.setLastActive = async function () {
  try {
    this.lastActive = new Date();
    await this.save();

    debugLog(
      'lastActive set to now',
      { groupCode: this.groupCode },
      LOG_LEVELS.INFO,
    );
  } catch (error) {
    debugLog(
      'Error setting lastActive',
      { error: error.message },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

const Group = model('Group', groupSchema);

export default Group;
