import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import sortByDate from '../../../shared/utils/dates/sortByDate.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

const { INFO } = LOG_LEVELS;
const { SORT_ORDER } = SYSTEM;
const { DESCENDING } = SORT_ORDER;

const { COMMON_FIELDS } = COMMON;
const { EXPENSE_FIELDS, EXPENSE_TYPE } = EXPENSE;
const { PAYMENT_FIELDS, PAYMENT_TYPE } = PAYMENT;
const { MEMBER_FIELDS } = MEMBER;

const getMemberTransactionsService = async (memberId, groupCode) => {
  debugLog(
    'Querying database for member transactions',
    { memberId, groupCode },
    INFO,
  );

  const [expenses, payments] = await Promise.all([
    Expense.find({
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
      $or: [
        { [EXPENSE_FIELDS.PAYER]: memberId },
        { [EXPENSE_FIELDS.BENEFICIARIES]: memberId },
      ],
    })
      .populate(EXPENSE_FIELDS.PAYER, MEMBER_FIELDS.NAME)
      .populate(EXPENSE_FIELDS.BENEFICIARIES, MEMBER_FIELDS.NAME)
      .lean(),

    Payment.find({
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
      $or: [
        { [PAYMENT_FIELDS.MAKER]: memberId },
        { [PAYMENT_FIELDS.RECIPIENT]: memberId },
      ],
    })
      .populate(PAYMENT_FIELDS.MAKER, MEMBER_FIELDS.NAME)
      .populate(PAYMENT_FIELDS.RECIPIENT, MEMBER_FIELDS.NAME)
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
    'Member transactions processed and sorted',
    { total: sortedTransactions.length },
    INFO,
  );

  return sortedTransactions;
};

export default getMemberTransactionsService;
