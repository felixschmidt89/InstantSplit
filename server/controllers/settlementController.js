import { StatusCodes } from 'http-status-codes';
import Settlement from '../models/Settlement.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { updateFixedDebitorCreditorOrderSetting } from '../utils/databaseUtils.js';

// Core function for deleting all settlements for a group (backend)
export const deleteAllSettlementsForGroup = async (groupCode) => {
  if (!groupCode) {
    throw new Error('Group code is required');
  }
  try {
    devLog('Deleting all settlements for group:', { groupCode });
    const result = await Settlement.deleteMany({ groupCode });

    devLog(`Deleted ${result.deletedCount} settlements for group ${groupCode}`);
    return result;
  } catch (error) {
    devLog('Error deleting all group settlements:', error);
    errorLog(
      error,
      'Error deleting all group settlements:',
      'Failed to delete group settlements.',
    );
    throw error;
  }
};

// Express route handler
export const deleteAllGroupSettlements = async (req, res) => {
  try {
    const { groupCode } = req.params;

    devLog('Deleting all settlements for group:', { groupCode });

    const result = await Settlement.deleteMany({ groupCode });

    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No settlements found for this group',
      });
    }

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All settlements for group deleted successfully',
    });
  } catch (error) {
    devLog('Error deleting all group settlements:', error);
    errorLog(
      error,
      'Error deleting all group settlements:',
      'Failed to delete group settlements. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const getAllGroupSettlements = async (req, res) => {
  try {
    const { groupCode } = req.params;

    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Group code is required',
      });
    }

    devLog('Fetching all settlements for group:', { groupCode });

    const settlements = await Settlement.find({ groupCode });

    if (!settlements || settlements.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No settlements found for this group',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      results: settlements.length,
      settlements,
      message: 'Settlements retrieved successfully',
    });
  } catch (error) {
    devLog('Error fetching group settlements:', error);
    errorLog(
      error,
      'Error fetching group settlements:',
      'Failed to retrieve group settlements. Please try again later.',
    );
    sendInternalError(res);
  }
};
