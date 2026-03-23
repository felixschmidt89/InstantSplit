import { StatusCodes } from 'http-status-codes';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import MEMBER_CONSTANTS from '../../../shared/constants/models/memberConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Expense from '../../models/Expense.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { INFO } = LOG_LEVELS;
const { COMMON_FIELDS } = COMMON_CONSTANTS;
const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { MEMBER_FIELDS } = MEMBER_CONSTANTS;

const deleteExpenseService = async (expenseId) => {
  debugLog(
    'Attempting atomic expense deletion and amountPerBeneficiary decrement',
    { expenseId },
    INFO,
  );

  const expense = await Expense.findById(expenseId).lean();

  if (!expense) {
    throw new ApiError('Expense not found', StatusCodes.NOT_FOUND);
  }

  const {
    [EXPENSE_FIELDS.PAYER]: payerId,
    [EXPENSE_FIELDS.BENEFICIARIES]: beneficiaryIds,
    [EXPENSE_FIELDS.AMOUNT]: amount,
    [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: amountPerBeneficiary,
    [COMMON_FIELDS.GROUP_CODE]: groupCode, // TODO: Drop when middleware handles settlement reset
  } = expense;

  await Promise.all([
    Expense.deleteOne({ [COMMON_FIELDS.ID]: expenseId }),

    // TODO: This should be a middleware that triggers after any expense modification, not just deletion
    // resetGroupSettlementsService(groupCode),

    // 2. Atomically adjust Payer's cached total

    Member.updateOne(
      { [COMMON_FIELDS.ID]: payerId },
      { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: -amount } },
    ),

    Member.updateMany(
      { [COMMON_FIELDS.ID]: { $in: beneficiaryIds } },
      { $inc: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: -amountPerBeneficiary } },
    ),
  ]);

  debugLog(
    'Expense deleted and member totals adjusted successfully',
    { expenseId, groupCode },
    INFO,
  );

  return true;
};

export default deleteExpenseService;
