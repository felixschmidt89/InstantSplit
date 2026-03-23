import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';

const { INFO } = LOG_LEVELS;
const { COMMON_FIELDS } = COMMON_CONSTANTS;

const getGroupExpensesService = async (groupCode) => {
  debugLog('Querying database for group expenses', { groupCode }, INFO);

  const expenses = await Expense.find({ [COMMON_FIELDS.GROUP_CODE]: groupCode })
    .sort({ [COMMON_FIELDS.CREATED_AT]: -1 })
    .lean();

  debugLog(
    'Group expenses retrieved successfully',
    {
      groupCode,
      count: expenses.length,
    },
    INFO,
  );

  return expenses;
};

export default getGroupExpensesService;
