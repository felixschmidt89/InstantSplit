import { StatusCodes } from 'http-status-codes';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import MEMBER_CONSTANTS from '../../../shared/constants/models/memberConstants.js';
import Expense from '../../models/Expense.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';

const { COMMON_FIELDS } = COMMON_CONSTANTS;
const { EXPENSE_FIELDS, EXPENSE_TYPE_VALUE } = EXPENSE_CONSTANTS;
const { MEMBER_FIELDS } = MEMBER_CONSTANTS;

const createExpenseService = async (groupCode, data) => {
  const { payerId, expenseDescription, expenseAmount, beneficiaryIds } = data;

  // 1. Validate Payer and Beneficiaries in the group
  const [payer, beneficiaries] = await Promise.all([
    Member.findOne({
      [COMMON_FIELDS.ID]: payerId,
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    }).select(COMMON_FIELDS.ID),
    Member.find({
      [COMMON_FIELDS.ID]: { $in: beneficiaryIds },
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    }).select(COMMON_FIELDS.ID),
  ]);

  if (!payer) {
    throw new ApiError(
      'Expense payer not found in this group',
      StatusCodes.NOT_FOUND,
    );
  }

  if (beneficiaries.length !== beneficiaryIds.length) {
    throw new ApiError(
      'One or more beneficiaries were not found in this group',
      StatusCodes.BAD_REQUEST,
    );
  }

  const amountPerBeneficiary = expenseAmount / beneficiaries.length;

  const expenseDocument = {
    [COMMON_FIELDS.TRANSACTION_TYPE]: EXPENSE_TYPE_VALUE,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
    [EXPENSE_FIELDS.DESCRIPTION]: expenseDescription,
    [EXPENSE_FIELDS.AMOUNT]: expenseAmount,
    [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: amountPerBeneficiary,
    [EXPENSE_FIELDS.PAYER]: payerId,
    [EXPENSE_FIELDS.BENEFICIARIES]: beneficiaryIds,
  };

  const [expense] = await Promise.all([
    Expense.create(expenseDocument),

    Member.updateOne(
      { [COMMON_FIELDS.ID]: payerId },
      { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: expenseAmount } },
    ),

    Member.updateMany(
      { [COMMON_FIELDS.ID]: { $in: beneficiaryIds } },
      { $inc: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: amountPerBeneficiary } },
    ),

    // TODO: Move these to a Group Maintenance Middleware/Service
    // resetGroupSettlementsService(groupCode),
  ]);

  debugLog(
    'Expense created and totals updated atomically',
    { id: expense._id, groupCode },
    LOG_LEVELS.INFO,
  );

  return expense;
};

export default createExpenseService;
