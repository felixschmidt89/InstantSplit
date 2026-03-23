import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';

const { INFO } = LOG_LEVELS;

const getGroupExpensesService = async (groupCode) => {
  debugLog('Querying database for group expenses', { groupCode }, INFO);

  const expenses = await Expense.find({ [COMMON.FIELDS.GROUP_CODE]: groupCode })
    .sort({ createdAt: -1 })
    .lean();

  debugLog(
    'Group expenses retrieved from DB',
    {
      groupCode,
      count: expenses.length,
    },
    INFO,
  );

  return expenses;
};

export default getGroupExpensesService;
