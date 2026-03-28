import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import sortByDate from '../../../shared/utils/dates/sortByDate.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { SORT_ORDER } = SYSTEM;
const { DESCENDING } = SORT_ORDER;

const { COMMON_FIELDS } = COMMON;
const { EXPENSE_TYPE } = EXPENSE;
const { PAYMENT_TYPE } = PAYMENT;

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

  const processedTransactions = [
    ...expenses.map((item) => ({
      ...item,
      itemId: item[COMMON_FIELDS.ID],
      itemType: EXPENSE_TYPE,
    })),
    ...payments.map((item) => ({
      ...item,
      itemId: item[COMMON_FIELDS.ID],
      itemType: PAYMENT_TYPE,
    })),
  ];

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
