import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import {
  LOG_LEVELS,
  LOG_SOURCES,
} from '../../../shared/constants/debugConstants.js';
import { DEBUG_MESSAGES } from '../../../shared/constants/debugMessageConstants.js'; // CODECHANGE: Import from correct file
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

export const getGroupTransactionsService = async (groupCode) => {
  debugLog(
    DEBUG_MESSAGES.SERVICE.QUERYING_DB,
    { groupCode },
    LOG_LEVELS.INFO,
    LOG_SOURCES.SERVER,
  );

  const [expenses, payments] = await Promise.all([
    Expense.find({ groupCode }),
    Payment.find({ groupCode }),
  ]);

  debugLog(
    DEBUG_MESSAGES.SERVICE.RAW_RESULTS,
    {
      expensesFound: expenses.length,
      paymentsFound: payments.length,
    },
    LOG_LEVELS.INFO,
    LOG_SOURCES.SERVER,
  );

  const transactions = [...expenses, ...payments];
  transactions.sort((a, b) => a.createdAt - b.createdAt);

  return transactions;
};
