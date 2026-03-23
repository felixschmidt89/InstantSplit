import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';

const { INFO } = LOG_LEVELS;

const getGroupExpensesTotalService = async (groupCode) => {
  debugLog('Calculating expenses total for group', { groupCode }, INFO);

  const result = await Expense.aggregate([
    {
      $match: { [COMMON.FIELDS.GROUP_CODE]: groupCode },
    },
    {
      $group: {
        _id: null,
        total: { $sum: `$${EXPENSE.FIELDS.AMOUNT}` },
      },
    },
  ]);

  const total = result.length > 0 ? result[0].total : 0;

  debugLog(
    'Group expenses total calculated successfully',
    { groupCode, total },
    INFO,
  );

  return total;
};

export default getGroupExpensesTotalService;
