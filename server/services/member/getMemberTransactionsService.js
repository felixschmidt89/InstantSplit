import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import { TRANSACTION_TYPES } from '../../../shared/constants/domain/transactionConstants.js';
import { COMMON_FIELDS } from '../../../shared/constants/models/commonConstants.js';
import { EXPENSE_FIELDS } from '../../../shared/constants/models/expenseConstants.js';
import { PAYMENT_FIELDS } from '../../../shared/constants/models/paymentConstants.js';
import { MEMBER_FIELDS } from '../../../shared/constants/models/memberConstants.js';

import debugLog from '../../../shared/utils/debug/debugLog.js';
import sortByDate from '../../../shared/utils/dates/sortByDate.js';

import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { SORT_ORDER } = SYSTEM;
const { DESCENDING } = SORT_ORDER;
const { EXPENSE, PAYMENT } = TRANSACTION_TYPES;
const { CREATED_AT } = COMMON_FIELDS;
const { EXPENSE_PAYER, EXPENSE_BENEFICIARIES } = EXPENSE_FIELDS;
const { PAYMENT_MAKER, PAYMENT_RECIPIENT } = PAYMENT_FIELDS;
const { MEMBER_NAME } = MEMBER_FIELDS;

const getMemberTransactionsService = async (memberId) => {
  debugLog('Querying database for member transactions', { memberId }, INFO);

  const [expenses, payments] = await Promise.all([
    Expense.find({
      $or: [
        { [EXPENSE_PAYER]: memberId },
        { [EXPENSE_BENEFICIARIES]: memberId },
      ],
    })
      .populate(EXPENSE_PAYER, MEMBER_NAME)
      .populate(EXPENSE_BENEFICIARIES, MEMBER_NAME)
      .lean(),

    Payment.find({
      $or: [{ [PAYMENT_MAKER]: memberId }, { [PAYMENT_RECIPIENT]: memberId }],
    })
      .populate(PAYMENT_MAKER, MEMBER_NAME)
      .populate(PAYMENT_RECIPIENT, MEMBER_NAME)
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
    ...expenses.map((item) => ({ ...item, itemType: EXPENSE })),
    ...payments.map((item) => ({ ...item, itemType: PAYMENT })),
  ];

  const sortedTransactions = sortByDate(transactions, CREATED_AT, DESCENDING);

  debugLog(
    'Member transactions processed and sorted',
    { total: sortedTransactions.length },
    INFO,
  );

  return sortedTransactions;
};

export default getMemberTransactionsService;
