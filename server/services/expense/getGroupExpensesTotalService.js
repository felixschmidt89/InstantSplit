import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';
import extractAggregationTotal from '../../utils/database/extractAggregationTotal.js';

const { INFO } = LOG_LEVELS;
const { COMMON_FIELDS } = COMMON_CONSTANTS;
const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;

const getGroupExpensesTotalService = async (groupCode) => {
  debugLog('Calculating expenses total for group', { groupCode }, INFO);

  const result = await Expense.aggregate([
    {
      $match: { [COMMON_FIELDS.GROUP_CODE]: groupCode },
    },
    {
      $group: {
        _id: null,
        total: { $sum: `$${EXPENSE_FIELDS.AMOUNT}` },
      },
    },
  ]);

  const total = extractAggregationTotal(result);

  debugLog(
    'Group expenses total calculated successfully',
    { groupCode, total },
    INFO,
  );

  return total;
};

export default getGroupExpensesTotalService;
