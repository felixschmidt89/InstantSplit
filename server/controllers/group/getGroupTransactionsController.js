import { StatusCodes } from 'http-status-codes';

import { API_MESSAGES } from '../../../shared/constants/apiMessageConstants.js';
import { API_RESPONSE_STATUS } from '../../../shared/constants/apiStatusConstants.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { touchGroupLastActive } from '../../utils/group/touchGroupLastActive.js';

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;
const { SUCCESS, STATUS_ERROR } = API_RESPONSE_STATUS;
const { INFO, LOG_ERROR } = LOG_LEVELS;

export const getGroupTransactions = async (req, res) => {
  const { groupCode } = req.params;

  debugLog('Fetching group transactions', { groupCode }, INFO);

  try {
    await touchGroupLastActive(groupCode);

    const transactions = await getGroupTransactionsService(groupCode);

    debugLog(
      'Group transactions fetched successfully',
      { count: transactions.length },
      INFO,
    );

    res.status(OK).json({
      status: SUCCESS,
      transactions,
      count: transactions.length,
      message: API_MESSAGES.TRANSACTIONS_FETCHED,
    });
  } catch (error) {
    debugLog(
      'Failed to fetch group transactions',
      { error: error.message, groupCode },
      LOG_ERROR,
    );

    res.status(INTERNAL_SERVER_ERROR).json({
      status: STATUS_ERROR,
      message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
