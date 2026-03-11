import { StatusCodes } from 'http-status-codes';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { MISSING_GROUPCODE_ERROR } from '../../constants/errorConstants.js';

const { OK, BAD_REQUEST } = StatusCodes;

export const getGroupTransactions = async (req, res, next) => {
  try {
    const { groupCode } = req;

    // TODO:  DRY THIS
    if (!groupCode) {
      const error = new Error(MISSING_GROUPCODE_ERROR);
      error.statusCode = BAD_REQUEST;
      throw error;
    }

    const transactions = await getGroupTransactionsService(groupCode);

    return res.status(OK).json({ transactions: transactions || [] });
  } catch (error) {
    next(error);
  }
};


