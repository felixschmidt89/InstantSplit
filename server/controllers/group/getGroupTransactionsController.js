import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

export const getGroupTransactions = async (req, res) => {
  try {
    const groupCode = req.headers[GROUPCODE.toLowerCase()];

    if (!groupCode) {
      console.error('GroupCode missing from headers!');
      return res.status(400).json({ error: 'Missing group code' });
    }

    const transactions = await getGroupTransactionsService(groupCode);

    // 3. Always return an object with a key named 'transactions'
    // to match your frontend destructuring: const { transactions } = await ...
    return res.status(200).json({ transactions: transactions || [] });
  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
