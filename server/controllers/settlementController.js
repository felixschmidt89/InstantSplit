import { StatusCodes } from 'http-status-codes';
import Settlement from '../models/Settlement.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';

export const persistGroupSettlements = async (req, res) => {
  try {
    const { groupCode, settlements } = req.body;

    devLog('Persisting settlements for group:', { groupCode, settlements });

    if (!groupCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Group code is required',
      });
    }
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

    // Validate each settlement
    for (const settlement of settlements) {
      if (!settlement.from || !settlement.to || !settlement.amount) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'Each settlement must include from, to, and amount',
        });
      }
      if (
        typeof settlement.amount !== 'number' ||
        settlement.amount < 0.01 ||
        settlement.amount > 99999.99
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'error',
          message: 'Settlement amount must be between 0.01 and 99999.99',
        });
      }
    }

    const settlementsToSave = settlements.map((settlement) => ({
      ...settlement,
      groupCode,
    }));

    const savedSettlements = await Settlement.insertMany(settlementsToSave);

    setGroupLastActivePropertyToNow(groupCode);

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
