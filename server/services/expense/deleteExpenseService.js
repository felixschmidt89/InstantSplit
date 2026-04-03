import { StatusCodes } from 'http-status-codes';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import Expense from '../../models/Expense.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { COMMON_FIELDS } = COMMON;
const { EXPENSE_FIELDS } = EXPENSE;
const { MEMBER_FIELDS } = MEMBER;
const { INFO } = LOG_LEVELS;
const { EXPENSE_ERRORS } = ERROR_CODES;
const { NOT_FOUND } = StatusCodes;

const deleteExpenseService = async (expenseId) => {
  debugLog(
    'Attempting atomic expense deletion and balance adjustment',
    { expenseId },
    INFO,
  );

  const expense = await Expense.findById(expenseId).lean();

  if (!expense) {
    throw new ApiError(NOT_FOUND, EXPENSE_ERRORS.NOT_FOUND);
  }

  const {
    [EXPENSE_FIELDS.PAYER]: payerId,
    [EXPENSE_FIELDS.BENEFICIARIES]: beneficiaryIds,
    [EXPENSE_FIELDS.AMOUNT]: amount,
    [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: amountPerBeneficiary,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  } = expense;

  await Promise.all([
    Expense.deleteOne({ [COMMON_FIELDS.ID]: expenseId }),
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
