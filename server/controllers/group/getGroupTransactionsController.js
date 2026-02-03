import { StatusCodes } from 'http-status-codes';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { setGroupLastActivePropertyToNow } from '../../utils/databaseUtils.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { API_RESPONSE_STATUS } from '../../../shared/constants/apiStatusConstants.js';
import { API_MESSAGES } from '../../../shared/constants/apiMessageConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';

export const getGroupTransactionsController = async (req, res) => {
  const { groupCode } = req.params;

  debugLog('Fetching transactions', { groupCode }, LOG_LEVELS.INFO);

  try {
    await setGroupLastActivePropertyToNow(groupCode);
    const transactions = await getGroupTransactionsService(groupCode);

    debugLog(
      'Transactions retrieved successfully',
      { groupCode, count: transactions.length },
      LOG_LEVELS.INFO,
    );

    res.status(StatusCodes.OK).json({
      status: API_RESPONSE_STATUS.SUCCESS,
      transactions,
      count: transactions.length,
      message: API_MESSAGES.TRANSACTIONS_FETCHED,
    });
  } catch (error) {
    debugLog(
      'Failed to fetch transactions',
      { error: error.message, groupCode },
      LOG_LEVELS.ERROR,
    );

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
