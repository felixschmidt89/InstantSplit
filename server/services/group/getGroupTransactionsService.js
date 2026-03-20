import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import { TRANSACTION_TYPES } from '../../../shared/constants/domain/transactionConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT_CONSTANTS from '../../../shared/constants/models/paymentConstants.js';

import debugLog from '../../../shared/utils/debug/debugLog.js';
import sortByDate from '../../../shared/utils/dates/sortByDate.js';

import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { SORT_ORDER } = SYSTEM;
const { DESCENDING } = SORT_ORDER;
const { EXPENSE, PAYMENT, UNKNOWN } = TRANSACTION_TYPES;

const { FIELDS: COMMON_FIELDS } = COMMON;
const { FIELDS: EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { FIELDS: PAYMENT_FIELDS } = PAYMENT_CONSTANTS;

const getGroupTransactionsService = async (groupCode) => {
  debugLog('Querying database for transactions', { groupCode }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({ [COMMON_FIELDS.GROUP_CODE]: groupCode }).lean(),
    Payment.find({ [COMMON_FIELDS.GROUP_CODE]: groupCode }).lean(),
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
    const isExpense = Boolean(item[EXPENSE_FIELDS.DESCRIPTION]);
    const isPayment = Boolean(item[PAYMENT_FIELDS.AMOUNT]);

    let itemType = UNKNOWN;

    if (isExpense) {
      itemType = EXPENSE;
    } else if (isPayment) {
      itemType = PAYMENT;
    }

    return {
      ...item,
      itemId: item[COMMON_FIELDS.ID],
      itemType,
    };
  });

  const sortedTransactions = sortByDate(
    processedTransactions,
    COMMON_FIELDS.CREATED_AT,
    DESCENDING,
  );

  debugLog(
    'Transactions processed and sorted',
    { total: sortedTransactions.length },
    INFO,
  );

  return sortedTransactions;
};

export default getGroupTransactionsService;
