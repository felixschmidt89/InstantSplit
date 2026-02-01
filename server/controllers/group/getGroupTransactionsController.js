import { StatusCodes } from 'http-status-codes';

import { setGroupLastActivePropertyToNow } from '../../utils/databaseUtils.js';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { debugLog } from '@instant-split/shared/utils/debug/debugLog.js';
import { API_RESPONSE_STATUS } from '@instant-split/shared/constants/apiStatusConstants.js';
import { API_MESSAGES } from '@instant-split/shared/constants/apiMessageConstants.js';
import {
  DEBUG_MESSAGES,
  LOG_LEVELS,
  LOG_SOURCES,
} from '@instant-split/shared/constants/debugConstants.js';

export const getGroupTransactionsController = async (req, res) => {
  const { groupCode } = req.params;

  // CODECHANGE: Added LOG_SOURCES.SERVER
  debugLog(
    DEBUG_MESSAGES.CONTROLLER.FETCHING_TRANSACTIONS,
    { groupCode },
    LOG_LEVELS.INFO,
    LOG_SOURCES.SERVER,
  );

  try {
    await setGroupLastActivePropertyToNow(groupCode);
    const transactions = await getGroupTransactionsService(groupCode);

    // CODECHANGE: Added LOG_SOURCES.SERVER
    debugLog(
      DEBUG_MESSAGES.CONTROLLER.TRANSACTIONS_RETRIEVED,
      { groupCode, count: transactions.length },
      LOG_LEVELS.SUCCESS,
      LOG_SOURCES.SERVER,
    );

    res.status(StatusCodes.OK).json({
      status: API_RESPONSE_STATUS.SUCCESS,
      transactions,
      count: transactions.length,
      message: API_MESSAGES.TRANSACTIONS_FETCHED,
    });
  } catch (error) {
    // CODECHANGE: Added LOG_SOURCES.SERVER
    debugLog(
      DEBUG_MESSAGES.CONTROLLER.FETCH_FAILED,
      { error: error.message, groupCode },
      LOG_LEVELS.ERROR,
      LOG_SOURCES.SERVER,
    );

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
