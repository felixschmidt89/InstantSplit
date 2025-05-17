import { Schema, model } from 'mongoose';
import { devLog } from '../utils/errorUtils.js';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
      index: true, // Index for quick lookups
    },
    groupName: {
      type: String,
      trim: true,
      required: [true, 'Missing group name'],
      minlength: [1, 'The group name must be at least 1 characters long'],
      maxlength: [30, 'The group name cannot exceed 30 characters'],
      index: true, // Index for quick lookups
    },
    // groupName set during registration, used for client routing
    initialGroupName: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !/\//.test(value), // disallow slashes
        message: 'The group name must not include slashes',
      },
    },
    currency: { type: String, default: '€' },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    // indicates whether group inactivity data purge is activated for the group.
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

/**
 * Sets the lastActive property to the current date and time, which is used for group inactivity data purge.
 * @memberof Group
 * @method setLastActive
 * @returns {Promise<void>} A Promise that resolves after the lastActive property is updated and saved.
 * @throws {Error} If there's an error setting the lastActive property.
 */ groupSchema.methods.setLastActive = async function () {
  try {
    this.lastActive = new Date();
    await this.save();
    devLog('lastActive set to now');
  } catch (error) {
    console.error('Error setting lastActive to now:', error);
    throw error;
  }
};

const Group = model('Group', groupSchema);

export default Group;
