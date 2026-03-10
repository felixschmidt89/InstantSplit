import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { debugLog, ERROR } from '../../../shared/utils/debug/debugLog.js';

export const getGroupTransactions = async (req, res) => {
  try {
    const { groupCode } = req;

    if (!groupCode) {
      debugLog('Controller Error: Missing groupCode context', null, ERROR);
      return res.status(400).json({ error: 'Missing groupCode context' });
    }

    const transactions = await getGroupTransactionsService(groupCode);

    return res.status(200).json({ transactions: transactions || [] });
  } catch (error) {
    debugLog('Controller Error: getGroupTransactions failed', error, ERROR);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
