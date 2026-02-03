import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;

export const getGroupTransactionsService = async (groupCode) => {
  debugLog('Querying database for transactions', { groupCode }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({ groupCode }),
    Payment.find({ groupCode }),
  ]);

  debugLog(
    'Raw results retrieved from DB',
    {
      expensesFound: expenses.length,
      paymentsFound: payments.length,
    },
    INFO,
  );

  const transactions = [...expenses, ...payments];
  transactions.sort((a, b) => b.createdAt - a.createdAt);

  return transactions;
};
