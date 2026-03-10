import { StatusCodes } from 'http-status-codes';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { debugLog, ERROR } from '../../../shared/utils/debug/debugLog.js';

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

export const getGroupTransactions = async (req, res) => {
  try {
    const { groupCode } = req;

    if (!groupCode) {
      debugLog('Controller Error: Missing groupCode context', null, ERROR);

      return res
        .status(BAD_REQUEST)
        .json({ error: 'Missing groupCode context' });
    }

    const transactions = await getGroupTransactionsService(groupCode);

    return res.status(OK).json({ transactions: transactions || [] });
  } catch (error) {
    debugLog('Controller Error: getGroupTransactions failed', error, ERROR);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
