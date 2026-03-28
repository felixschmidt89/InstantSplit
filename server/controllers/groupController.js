import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';
import {
  // TODO: Drop legacy utils
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';
import debugLog from '../../shared/utils/debug/debugLog.js';

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
