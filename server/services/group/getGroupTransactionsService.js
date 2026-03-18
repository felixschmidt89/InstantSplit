import { LOG_LEVELS } from '../../../shared/constants/system/loggerConstants.js/index.js';
import { TRANSACTION_TYPES } from '../../../shared/constants/domain/transactionConstants.js/index.js';
import { COMMON_FIELDS } from '../../../shared/constants/models/commonConstants.js';
import { EXPENSE_FIELDS } from '../../../shared/constants/models/expenseConstants.js';
import { PAYMENT_FIELDS } from '../../../shared/constants/models/paymentConstants.js';

import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import sortByDateDescending from '../../../shared/utils/dates/sortByDateDescending.js';

import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { EXPENSE, PAYMENT, UNKNOWN } = TRANSACTION_TYPES;
const { ID, CREATED_AT } = COMMON_FIELDS;
const { EXPENSE_DESCRIPTION } = EXPENSE_FIELDS;
const { PAYMENT_AMOUNT } = PAYMENT_FIELDS;

export const getGroupTransactionsService = async (groupCode) => {
  debugLog('Querying database for transactions', { groupCode }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({ groupCode }).lean(),
    Payment.find({ groupCode }).lean(),
  ]);

  debugLog(
    'Raw results retrieved from DB',
    {
      expensesCount: expenses.length,
      paymentsCount: payments.length,
    },
    INFO,
  );

  const rawTransactions = [...expenses, ...payments];

  const processedTransactions = rawTransactions.map((item) => {
    let itemType = UNKNOWN;

    if (item[EXPENSE_DESCRIPTION]) {
      itemType = EXPENSE;
    } else if (item[PAYMENT_AMOUNT]) {
      itemType = PAYMENT;
    }

    return {
      ...item,
      itemId: item[ID],
      itemType,
    };
  });

  const sortedTransactions = sortByDateDescending(
    processedTransactions,
    CREATED_AT,
  );

  debugLog(
    'Transactions processed and sorted',
    { total: sortedTransactions.length },
    INFO,
  );

  return sortedTransactions;
};
