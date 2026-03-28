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
const { EXPENSE_FIELDS, EXPENSE_TYPE_VALUE } = EXPENSE;
const { MEMBER_FIELDS } = MEMBER;
const { INFO } = LOG_LEVELS;
const { MEMBER_ERRORS } = ERROR_CODES;
const { NOT_FOUND, BAD_REQUEST } = StatusCodes;

const createExpenseService = async (groupCode, data) => {
  const { payerId, expenseDescription, expenseAmount, beneficiaryIds } = data;

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
    throw new ApiError(NOT_FOUND, MEMBER_ERRORS.NOT_FOUND);
  }

  if (beneficiaries.length !== beneficiaryIds.length) {
    throw new ApiError(BAD_REQUEST, MEMBER_ERRORS.BENEFICIARY_NOT_FOUND);
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

  const expense = await Expense.create(expenseDocument);

  await Promise.all([
    Member.updateOne(
      { [COMMON_FIELDS.ID]: payerId },
      { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: expenseAmount } },
    ),
    Member.updateMany(
      { [COMMON_FIELDS.ID]: { $in: beneficiaryIds } },
      { $inc: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: amountPerBeneficiary } },
    ),
  ]);

  // TODO: Move these to a Group Maintenance Middleware/Service
  // resetGroupSettlementsService(groupCode),

  debugLog(
    'Expense created and totals updated atomically',
    { id: expense._id, groupCode },
    INFO,
  );

  return expense;
};

export default createExpenseService;
