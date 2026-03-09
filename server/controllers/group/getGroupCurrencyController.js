import { StatusCodes } from 'http-status-codes';

import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';
import { API_MESSAGES } from '../../../shared/constants/apiMessageConstants.js';
import { API_RESPONSE_STATUS } from '../../../shared/constants/apiStatusConstants.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
// Assuming you'll move the DB logic to a service like your transactions example
import { getGroupCurrencyService } from '../../services/group/getGroupCurrencyService.js';
import { touchGroupLastActive } from '../../utils/group/touchGroupLastActive.js';

const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;
const { SUCCESS, STATUS_ERROR } = API_RESPONSE_STATUS;
const { INFO, LOG_ERROR } = LOG_LEVELS;
const { GROUPCODE } = API_HEADERS;

export const getGroupCurrency = async (req, res) => {
  // 1. Pull groupCode from headers instead of params
  const groupCode = req.headers[GROUPCODE];

  debugLog('Fetching group currency', { groupCode }, INFO);

  if (!groupCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: STATUS_ERROR,
      message: 'Missing group authorization header',
    });
  }

  try {
    // 2. Update activity timestamp (following your pattern)
    await touchGroupLastActive(groupCode);

    // 3. Delegate to service layer
    const currency = await getGroupCurrencyService(groupCode);

    if (!currency) {
      debugLog('No group found for currency fetch', { groupCode }, INFO);
      return res.status(NOT_FOUND).json({
        status: STATUS_ERROR,
        message: 'Group not found',
      });
    }

    debugLog(
      'Group currency fetched successfully',
      { groupCode, currency },
      INFO,
    );

    res.status(OK).json({
      status: SUCCESS,
      currency,
      message: 'Group currency retrieved successfully',
    });
  } catch (error) {
    debugLog(
      'Failed to fetch group currency',
      { error: error.message, groupCode },
      LOG_ERROR,
    );

    res.status(INTERNAL_SERVER_ERROR).json({
      status: STATUS_ERROR,
      message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
