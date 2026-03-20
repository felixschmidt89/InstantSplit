import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import { TRANSACTION_TYPES } from '../../../shared/constants/domain/transactionConstants.js';

import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';

import debugLog from '../../../shared/utils/debug/debugLog.js';
import sortByDate from '../../../shared/utils/dates/sortByDate.js';

import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { EXPENSE: TYPE_EXPENSE, PAYMENT: TYPE_PAYMENT } = TRANSACTION_TYPES;

const getMemberTransactionsService = async (memberId) => {
  debugLog('Querying database for member transactions', { memberId }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({
      $or: [
        { [EXPENSE.FIELDS.PAYER]: memberId },
        { [EXPENSE.FIELDS.BENEFICIARIES]: memberId },
      ],
    })
      .populate(EXPENSE.FIELDS.PAYER, MEMBER.FIELDS.NAME)
      .populate(EXPENSE.FIELDS.BENEFICIARIES, MEMBER.FIELDS.NAME)
      .lean(),

    Payment.find({
      $or: [
        { [PAYMENT.FIELDS.MAKER]: memberId },
        { [PAYMENT.FIELDS.RECIPIENT]: memberId },
      ],
    })
      .populate(PAYMENT.FIELDS.MAKER, MEMBER.FIELDS.NAME)
      .populate(PAYMENT.FIELDS.RECIPIENT, MEMBER.FIELDS.NAME)
      .lean(),
  ]);

  debugLog(
    'Member results retrieved from DB',
    {
      expensesCount: expenses.length,
      paymentsCount: payments.length,
    },
    INFO,
  );

  const transactions = [
    ...expenses.map((item) => ({ ...item, itemType: TYPE_EXPENSE })),
    ...payments.map((item) => ({ ...item, itemType: TYPE_PAYMENT })),
  ];

  const sortedTransactions = sortByDate(
    transactions,
    COMMON.FIELDS.CREATED_AT,
    SYSTEM.SORT_ORDER.DESCENDING,
  );

  debugLog(
    'Member transactions processed and sorted',
    { total: sortedTransactions.length },
    INFO,
  );

  return sortedTransactions;
};

export default getMemberTransactionsService;
