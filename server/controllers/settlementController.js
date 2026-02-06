import { StatusCodes } from 'http-status-codes';
import Settlement from '../models/Settlement.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import {
  touchGroupLastActive,
  updateFixedDebitorCreditorOrderSetting,
} from '../utils/databaseUtils.js';

export const persistGroupSettlements = async (req, res) => {
  try {
    const { settlements } = req.body;

    devLog('Persisting settlements:', { settlements });

    if (
      !settlements ||
      !Array.isArray(settlements) ||
      settlements.length === 0
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Settlements must be a non-empty array',
      });
    }

    let groupCode = null;
    for (const settlement of settlements) {
      if (
        !settlement.from ||
        !settlement.to ||
        settlement.amount == null ||
        !settlement.groupCode
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          message:
            'Each settlement must include from, to, amount, and groupCode',
        });
      }
      const amount = Number(settlement.amount);
      if (isNaN(amount) || amount < 0.01 || amount > 99999.99) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          message:
            'Settlement amount must be a number between 0.01 and 99999.99',
        });
      }
      if (groupCode === null) {
        groupCode = settlement.groupCode;
      } else if (settlement.groupCode !== groupCode) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'All settlements must have the same groupCode',
        });
      }
    }

    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'No valid groupCode found in settlements',
      });
    }

    const settlementsToSave = settlements.map(
      ({ from, to, amount, groupCode }) => ({
        from,
        to,
        amount: Number(amount),
        groupCode,
      }),
    );

    devLog('Saving settlements to database:', settlementsToSave);

    const savedSettlements = await Settlement.insertMany(settlementsToSave);

    devLog('Settlements saved, updating group settings:', { groupCode });

    await updateFixedDebitorCreditorOrderSetting(groupCode, true);
    await touchGroupLastActive(groupCode);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      results: savedSettlements.length,
      settlements: savedSettlements,
      message: 'Settlements persisted successfully',
    });
  } catch (error) {
    devLog('Error persisting settlements:', error);
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error persisting settlements:',
        'Failed to persist settlements. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

export const deleteSettlement = async (req, res) => {
  try {
    const { from, to, amount, groupCode } = req.body;

    devLog('Deleting settlement:', { from, to, amount, groupCode });

    if (!from || !to || !amount || !groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Settlement must include from, to, amount, and groupCode',
      });
    }
    if (typeof amount !== 'number' || amount < 0.01 || amount > 99999.99) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Settlement amount must be between 0.01 and 99999.99',
      });
    }

    const deletedSettlement = await Settlement.findOneAndDelete({
      from,
      to,
      amount,
      groupCode,
    });

    if (!deletedSettlement) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Settlement not found',
      });
    }
    await updateFixedDebitorCreditorOrderSetting(groupCode, true);
    touchGroupLastActive(groupCode);

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'Settlement deleted successfully',
    });
  } catch (error) {
    devLog('Error deleting settlement:', error);
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error deleting settlement:',
        'Failed to delete settlement. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

// Core function for deleting all settlements for a group (backend)
export const deleteAllSettlementsForGroup = async (groupCode) => {
  if (!groupCode) {
    throw new Error('Group code is required');
  }
  try {
    devLog('Deleting all settlements for group:', { groupCode });
    const result = await Settlement.deleteMany({ groupCode });

    await touchGroupLastActive(groupCode);

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

    touchGroupLastActive(groupCode);

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

    await touchGroupLastActive(groupCode);

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
