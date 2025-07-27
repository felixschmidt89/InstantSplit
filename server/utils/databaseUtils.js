import Group from '../models/Group.js';
import { devLog, errorLog } from './errorUtils.js';
import { validateString } from './validationUtils.js';
import mongoose from 'mongoose';

/**
 * Checks if groupCode is unique in the database.
 *
 * @param {string} groupCode - The groupCode to check for uniqueness.
 * @returns {Promise<boolean>} - Returns true if groupCode is unique, false if it already exists.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const isGroupCodeUnique = async (groupCode) => {
  try {
    // Validate that groupCode is a valid string
    validateString(groupCode, 'groupCode');

    // Find the existing group in the database by groupCode
    const existingGroup = await Group.findOne({ groupCode });

    // Log a message if the groupCode is unique in development environment
    if (!existingGroup) {
      devLog(`GroupCode "${groupCode}" is unique.`);
    }

    // Return true if the groupCode is unique (existingGroup is falsy)
    return !existingGroup;
  } catch (error) {
    // Log and transform any other error using prodErrorLog
    errorLog(
      error,
      'Error checking groupCode uniqueness:',
      'Failed to check groupCode uniqueness. Please try again later.',
    );
  }
};

/**
 * Obtains the groupObjectId of a group by its groupCode.
 *
 * @param {string} groupCode - The groupCode to search for.
 * @returns {Promise<string>} - The groupObjectId of the group.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const getGroupObjectIdByGroupCode = async (groupCode) => {
  try {
    // Validate that groupCode is a valid string
    validateString(groupCode, 'groupCode');

    // Find the group in the database by groupCode
    const group = await Group.findOne({ groupCode });

    // If the group is found, log its ObjectId in development environment
    if (group) {
      devLog(
        `Group with groupCode "${groupCode}" found. ObjectId: ${group._id.toString()}`,
      );
    }

    // If the group is not found, log and transform the error
    if (!group) {
      errorLog(
        new Error(`No group found with groupCode "${groupCode}"`),
        'Error obtaining groupObjectId by groupCode:',
        `No group found with groupCode "${groupCode}"`,
      );
    }

    // Return the groupObjectId of the group as a string
    return group._id.toString();
  } catch (error) {
    // Log and transform any other error using prodErrorLog
    errorLog(
      error,
      'Error obtaining groupObjectId by groupCode:',
      'Failed to obtain the groupObjectId by groupCode.',
    );
  }
};

/**
 * Obtains the user's objectId by their username and group code.
 *
 * @param {string} groupCode - The group code of the user.
 * @param {string} userName - The username of the user.
 * @returns {Promise<string>} - The objectId of the user as a string.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const getUserIdByUserNameAndGroupCodeHelper = async (
  groupCode,
  userName,
) => {
  try {
    // Validate that groupCode and userName are valid strings
    validateString(groupCode, 'groupCode');
    validateString(userName, 'userName');

    // Find the user in the database by groupCode and userName
    const user = await User.findOne({
      groupCode,
      userName,
    });

    // If the user is found, log its ObjectId in development environment
    if (user) {
      devLog(
        `User with groupCode "${groupCode}" and username "${userName}" found. ObjectId: ${user._id.toString()}`,
      );
    }

    // If the user is not found, log and transform the error
    if (!user) {
      errorLog(
        new Error(
          `No user found with groupCode "${groupCode}" and username "${userName}"`,
        ),
        "Error obtaining the user's objectId:",
        `No user found with groupCode "${groupCode}" and username "${userName}"`,
      );
    }

    // Return the objectId of the user as a string
    return user._id.toString();
  } catch (error) {
    // Log and transform any other error
    errorLog(
      error,
      "Error obtaining the user's objectId:",
      "Failed to obtain the user's objectId.",
    );
  }
};

/**
 * Obtains the userName of a user by the user's ObjectId.
 *
 * @param {string} userId - The ObjectId of the user.
 * @returns {Promise<string>} - The userName of the user.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const getUserNameByUserIdHelper = async (userId) => {
  try {
    // Ensure userId is a valid string
    validateString(userId, 'userId');

    // Find the user in the database by userId
    const user = await User.findById(userId);

    // If the user is found, log its userName in development environment
    if (user) {
      devLog(
        `User with ObjectId "${userId}" found. UserName: ${user.userName}`,
      );
    }

    // If the user is not found, throw an error
    if (!user) {
      // Log and transform the error using prodErrorLog
      errorLog(
        new Error(`No user found with ObjectId "${userId}"`),
        "Error obtaining the user's userName:",
        `No user found with ObjectId "${userId}"`,
      );
    }

    return user.userName;
  } catch (error) {
    // Log and transform any other error
    errorLog(
      error,
      "Error obtaining the user's userName:",
      "Failed to obtain the user's userName.",
    );
  }
};

/**
 * Updates the lastActive property of a group with the specified groupCode.
 *
 * @param {string} groupCode - The group code to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const setGroupLastActivePropertyToNow = async (groupCode) => {
  try {
    validateString(groupCode, 'groupCode');

    // Find the group in the database by groupCode
    const group = await Group.findOne({ groupCode });

    // If the group is found, update its lastActive property
    if (group) {
      await group.setLastActive();
      devLog(
        `Successfully updated lastActive for group with groupCode "${groupCode}"`,
      );
    } else {
      // If the group is not found, log and transform the error
      errorLog(
        new Error(`Group with ${groupCode} not found.'`),
        'Error setting lastActive:',
        'Failed to update lastActive. Group not found.',
      );
    }
  } catch (error) {
    // Log and transform any other error
    errorLog(
      error,
      'Error setting lastActive:',
      'Failed to update lastActive.',
    );
  }
};

/**
 * Updates the fixedDebitorCreditorOrder setting of a group with the specified groupCode.
 *
 * @param {string} groupCode - The group code to update.
 * @param {boolean} fixedDebitorCreditorOrder - The new fixedDebitorCreditorOrder setting value.
 * @returns {Promise<object>} - The updated group document.
 * @throws {Error} - If the group is not found or the update fails.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const updateFixedDebitorCreditorOrderSetting = async (
  groupCode,
  fixedDebitorCreditorOrder,
) => {
  try {
    validateString(groupCode, 'groupCode');

    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      {
        $set: {
          lastActive: new Date(),
          fixedDebitorCreditorOrder,
        },
      },
      { new: true },
    );

    if (!updatedGroup) {
      throw new Error(`Group with groupCode "${groupCode}" not found`);
    }

    devLog(
      `Successfully updated fixedDebitorCreditorOrder to ${fixedDebitorCreditorOrder} for group with groupCode "${groupCode}"`,
    );

    return updatedGroup;
  } catch (error) {
    errorLog(
      error,
      'Error updating fixedDebitorCreditorOrder setting:',
      'Failed to update fixedDebitorCreditorOrder setting.',
    );
    throw error;
  }
};

/**
 * Deletes all settlements for a group with the specified groupCode.
 *
 * @param {string} groupCode - The group code of the settlements to delete.
 * @returns {Promise<number>} - The number of settlements deleted.
 * @throws {Error} - If the group is not found or the deletion fails.
 * Logs errors for internal debugging purposes and transforms them for production logging with a custom prefix and user-friendly message.
 */
export const deleteAllGroupSettlements = async (groupCode) => {
  try {
    validateString(groupCode, 'groupCode');

    const group = await Group.findOne({ groupCode });
    if (!group) {
      throw new Error(`Group with groupCode "${groupCode}" not found`);
    }

    const result = await Settlement.deleteMany({ groupCode });

    devLog(
      `Successfully deleted ${result.deletedCount} settlements for group with groupCode "${groupCode}"`,
    );

    return result.deletedCount;
  } catch (error) {
    errorLog(
      error,
      'Error deleting group settlements:',
      'Failed to delete group settlements.',
    );
    throw error;
  }
};
