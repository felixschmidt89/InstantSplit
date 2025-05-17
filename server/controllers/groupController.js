import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import { customAlphabet } from 'nanoid';
import Group from '../models/Group.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { generateUniqueGroupCode } from '../utils/groupCodeUtils.js';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';

// Get email credentials from environment variables
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

/**
 * Creates a new group with a globally unique group ID
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} The created group object.
 *
 */

export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;

    const groupCode = await generateUniqueGroupCode();
    const group = await Group.create({
      groupName,
      groupCode,
      initialGroupName: groupName, // Set initialGroupName during creation
    });

    // Send email notification in production
    if (process.env.NODE_ENV === 'production') {
      // Create a transporter using email service's SMTP settings
      const transporter = nodemailer.createTransport({
        host: 'smtp.strato.de',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define the email notification copy
      const mailOptions = {
        from: 'admin@instantsplit.de',
        to: 'felix.schmidt@directbox.com',
        subject: `New group ${groupName} created`,
        text: `
      GroupName: "${groupName}"
      `,
      };

      // Log error, else send
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          errorLog(
            error,
            'Error sending group creation email:',
            'Failed to send group creation email. Please try again later.',
          );
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    setGroupLastActivePropertyToNow(groupCode);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      group,
      message: 'Group created',
    });
  } catch (error) {
    devLog('error:', error);
    devLog('error.name:', error.name);
    if (error.name === 'ValidationError') {
      return sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error creating group:',
        'Failed to create the group. Please try again later.',
      );
      sendInternalError();
    }
  }
};

export const changeGroupName = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupName } = req.body;

    devLog('Updating group name. Received data:', {
      groupId,
      groupName,
    });

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $set: { lastActive: new Date(), groupName } },
      { new: true, runValidators: true },
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedGroup,
      message: 'Group name updated successfully.',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error updating group name:',
        'Failed to update group name. Please try again later.',
      );
      sendInternalError();
    }
  }
};

export const changeGroupDataPurgeSetting = async (req, res) => {
  try {
    const { groupCode, inactiveDataPurge } = req.body;
    console.log('Request Body:', req.body);
    console.log('Updating group with groupCode:', groupCode);

    // Update the document and return the modified document
    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      {
        $set: {
          lastActive: new Date(),
          inactiveDataPurge,
        },
      },
      { new: true }, // Return the modified document
    );

    if (!updatedGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found with the provided groupCode',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedGroup,
      message: 'Group inactive data purge setting updated successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error updating inactive data purge setting:',
      'Failed to update inactive data purge setting. Please try again later.',
    );
    sendInternalError();
  }
};

export const changeFixedDebitorCreditorOrderSetting = async (req, res) => {
  try {
    const { groupCode, fixedDebitorCreditorOrder } = req.body;
    console.log('Request Body:', req.body);
    console.log('Updating group with groupCode:', groupCode);

    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      {
        $set: {
          lastActive: new Date(),
          fixedDebitorCreditorOrder,
        },
      },
      { new: true }, // Return the modified document
    );

    if (!updatedGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found with the provided groupCode',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedGroup,
      message: 'Group fixedDebitorCreditor setting updated successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error updating fixedDebitorCreditor setting:',
      'Failed to update fixedDebitorCreditor setting. Please try again later.',
    );
    sendInternalError();
  }
};

export const listGroupNamesByStoredGroupCodes = async (req, res) => {
  try {
    const { storedGroupCodes } = req.query;
    const groupCodesArray = storedGroupCodes.split(',');
    const groups = await Group.find({ groupCode: { $in: groupCodesArray } });
    const groupNamesAndGroupCodes = groups.map((group) => ({
      groupName: group.groupName,
      groupCode: group.groupCode,
    }));
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groupNamesAndGroupCodes.length,
      groupNamesAndGroupCodes,
      message: 'Group names retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing group names:',
      'Failed to list group names. Please try again later.',
    );
    sendInternalError();
  }
};

export const getGroupCurrency = async (req, res) => {
  try {
    const { groupCode } = req.params;

    const group = await Group.findOne({ groupCode });

    if (!group) {
      return res.status(StatusCodes.NO_CONTENT).json({
        status: 'success',
        message: 'No group found',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      currency: group.currency,
      message: 'Group currency retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error fetching group currency:',
      'Failed to fetch group information. Please try again later.',
    );
    sendInternalError();
  }
};

export const changeGroupCurrency = async (req, res) => {
  try {
    const { groupCode, currency } = req.body;

    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      { $set: { lastActive: new Date(), currency } },
      { new: true }, // return the modified document
    );

    // Check if the group with the given groupCode is not found
    if (!updatedGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found with the provided groupCode',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedGroup: { currency: updatedGroup.currency },
      message: 'Group currency changed successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error changing group currency:',
      'Failed to change group currency. Please try again later.',
    );
    sendInternalError();
  }
};

export const listExpensesAndPaymentsByGroup = async (req, res) => {
  try {
    const { groupCode } = req.params;
    setGroupLastActivePropertyToNow(groupCode);
    const [expenses, payments] = await Promise.all([
      Expense.find({ groupCode }).populate('expensePayer', 'userName'),
      Payment.find({ groupCode })
        .populate('paymentMaker', 'userName')
        .populate('paymentRecipient', 'userName'),
    ]);

    const groupExpensesAndPayments = [...expenses, ...payments];

    groupExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    res.status(StatusCodes.OK).json({
      status: 'success',
      groupExpensesAndPayments,
      message: 'All group expenses and payments retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing expenses and payments:',
      'Failed to list expenses and payments. Please try again later.',
    );
    sendInternalError(rs);
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const { groupCode } = req.params;

    setGroupLastActivePropertyToNow(groupCode);

    const group = await Group.findOne({ groupCode });

    if (!group) {
      return res.status(StatusCodes.NO_CONTENT).json({
        status: 'success',
        message: 'No group found',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      group,
      message: 'Group info retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error fetching group info:',
      'Failed to fetch group information. Please try again later.',
    );
    sendInternalError();
  }
};

/**
 * Validates the existence of a group with the provided groupCode in the database.
 * Sends a response indicating whether the group exists or not.
 * @param {object} req
 * @param {object} res
 * @returns {object} JSON response with status, data (boolean value), and message fields.
 */
export const validateGroupExistence = async (req, res) => {
  try {
    const { groupCode } = req.params;
    const group = await Group.findOne({ groupCode });

    if (group) {
      res.status(StatusCodes.OK).json({
        status: 'success',
        exists: true,
        message: 'The group exists',
      });
    } else {
      res.status(StatusCodes.OK).json({
        status: 'success',
        exists: false,
        message: 'The group does not exist',
      });
    }
  } catch (error) {
    errorLog(
      error,
      'Error fetching group info:',
      'Failed to fetch group information. Please try again later.',
    );
    sendInternalError();
  }
};

/**
 * Resets creditorIndex and debitorIndex to 0 for all users in a group
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated users
 */
export const resetCreditorIndicesAndDebitorIndices = async (req, res) => {
  try {
    const { groupCode } = req.params;

    devLog('Resetting creditor and debitor indices for group:', { groupCode });

    // Validate groupCode
    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Group code is required',
      });
    }

    // Check if group exists
    const group = await Group.findOne({ groupCode });
    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found',
      });
    }

    // Update group last active
    await setGroupLastActivePropertyToNow(groupCode);

    // Reset creditorIndex and debitorIndex for all users in the group
    const updateResult = await User.updateMany(
      { groupCode },
      { $set: { creditorIndex: 0, debitorIndex: 0 } },
      { runValidators: true },
    );

    // Fetch updated users for response
    const updatedUsers = await User.find({ groupCode }).select(
      'userName creditorIndex debitorIndex',
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedUsers,
      message: `Reset creditorIndex and debitorIndex for ${updateResult.modifiedCount} users in group ${groupCode}`,
    });
  } catch (error) {
    devLog('Error in resetCreditorIndicesAndDebitorIndices:', error);
    errorLog(
      error,
      'Error resetting creditor and debitor indices:',
      'Failed to reset creditor and debitor indices. Please try again later.',
    );
    return sendInternalError(res);
  }
};

/**
 * Retrieves the fixedDebitorCreditorOrder status for a group
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with fixedDebitorCreditorOrder boolean
 */
export const getFixedDebitorCreditorOrderStatus = async (req, res) => {
  try {
    const { groupCode } = req.params;

    devLog('Fetching fixedDebitorCreditorOrder status for group:', {
      groupCode,
    });

    // Validate groupCode
    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Group code is required',
      });
    }

    // Find group
    const group = await Group.findOne({ groupCode }).select(
      'fixedDebitorCreditorOrder',
    );

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found',
      });
    }

    // Update group last active
    await setGroupLastActivePropertyToNow(groupCode);

    res.status(StatusCodes.OK).json({
      status: 'success',
      fixedDebitorCreditorOrder: group.fixedDebitorCreditorOrder,
      message: 'fixedDebitorCreditorOrder status retrieved successfully',
    });
  } catch (error) {
    devLog('Error in getFixedDebitorCreditorOrderStatus:', error);
    errorLog(
      error,
      'Error fetching fixedDebitorCreditorOrder status:',
      'Failed to fetch fixedDebitorCreditorOrder status. Please try again later.',
    );
    return sendInternalError(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groups.length,
      groups,
      message: 'All groups retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all groups:',
      'Failed to list all groups. Please try again later.',
    );
    sendInternalError();
  }
};

export const deleteAllGroups = async (req, res) => {
  try {
    await Group.deleteMany();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All groups deleted successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting all groups:',
      'Failed to delete all groups. Please try again later.',
    );
    sendInternalError();
  }
};
