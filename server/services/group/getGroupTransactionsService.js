import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { TRANSACTION_TYPES } from '../../../shared/constants/transactionConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { EXPENSE, PAYMENT, UNKNOWN } = TRANSACTION_TYPES;

export const getGroupTransactionsService = async (groupCode) => {
  debugLog('Querying database for transactions', { groupCode }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({ groupCode }).lean(),
    Payment.find({ groupCode }).lean(),
  ]);

  debugLog(
    'Raw results retrieved from DB',
    {
      expensesFound: expenses.length,
      paymentsFound: payments.length,
    },
    INFO,
  );

  const rawTransactions = [...expenses, ...payments];

  const transactions = rawTransactions.map((item) => {
    const itemObject = item;

    let itemType = UNKNOWN;

    if (itemObject.expenseDescription) {
      itemType = EXPENSE;
    } else if (itemObject.paymentAmount) {
      itemType = PAYMENT;
    }

    return {
      ...itemObject,
      itemId: itemObject._id,
      itemType,
    };
  });

  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return transactions;
};
