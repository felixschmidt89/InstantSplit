import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { generateUniqueGroupCode } from '../utils/groupCodeUtils.js';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';
import { generateGroupCreationEmailOptions } from '../utils/adminNotificationEmailTemplates.js';
import { sendAdminEmailNotification } from '../config/adminNotificationEmailConfig.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';
import { debugLog } from '../../shared/utils/debug/debugLog.js';

export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;

    const groupCode = await generateUniqueGroupCode();
    const group = await Group.create({
      groupName,
      groupCode,
      initialGroupName: groupName,
    });

    const mailOptions = generateGroupCreationEmailOptions(groupName);

    sendAdminEmailNotification(mailOptions);

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
      sendInternalError(res, error);
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
      sendInternalError(res, error);
    }
  }
};

export const changeGroupDataPurgeSetting = async (req, res) => {
  try {
    const { groupCode, inactiveDataPurge } = req.body;
    console.log('Request Body:', req.body);
    console.log('Updating group with groupCode:', groupCode);

    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      {
        $set: {
          lastActive: new Date(),
          inactiveDataPurge,
        },
      },
      { new: true },
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
    sendInternalError(res, error);
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
      { new: true },
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
    sendInternalError(res, error);
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
    sendInternalError(res, error);
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
    sendInternalError(res, error);
  }
};

export const changeGroupCurrency = async (req, res) => {
  try {
    const { groupCode, currency } = req.body;

    const updatedGroup = await Group.findOneAndUpdate(
      { groupCode },
      { $set: { lastActive: new Date(), currency } },
      { new: true },
    );

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
    sendInternalError(res, error);
  }
};

// TODO: DELETE
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
    sendInternalError(res, error);
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
    sendInternalError(res, error);
  }
};

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
    sendInternalError(res, error);
  }
};

export const groupHasPersistedDebitorCreditorOrder = async (req, res) => {
  try {
    const { groupCode } = req.params;

    debugLog(
      'Checking fixedDebitorCreditorOrder for group',
      { groupCode },
      LOG_LEVELS.INFO,
    );

    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Group code is required',
      });
    }

    const group = await Group.findOne({ groupCode }).select(
      'fixedDebitorCreditorOrder',
    );

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Group not found',
      });
    }

    await setGroupLastActivePropertyToNow(groupCode);

    const hasPersistedOrder = !!group.fixedDebitorCreditorOrder;

    return res.status(StatusCodes.OK).json({ hasPersistedOrder });
  } catch (error) {
    debugLog(
      'Error in groupHasPersistedDebitorCreditorOrder',
      { error: error.message },
      LOG_LEVELS.LOG_ERROR,
    );

    return sendInternalError(res, error);
  }
};
// TODO: Ensure that this function is limited to development mode only

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
    sendInternalError(res, error);
  }
};
