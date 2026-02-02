import { debugLog } from '@instant-split/shared/utils/debug/debugLog.js';
import {
  LOG_LEVELS,
  LOG_SOURCES,
} from '@instant-split/shared/constants/debugConstants.js';
import { DEBUG_MESSAGES } from '@instant-split/shared/constants/debugMessageConstants.js';
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
  // CODECHANGE: Sort by createdAt descending (newest first)
  transactions.sort((a, b) => b.createdAt - a.createdAt);

  return transactions;
};
