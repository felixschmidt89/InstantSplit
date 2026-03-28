import { StatusCodes } from 'http-status-codes';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Expense from '../../models/Expense.js';
import ApiError from '../../utils/errors/ApiError.js';

const { EXPENSE_FIELDS } = EXPENSE;
const { MEMBER_FIELDS } = MEMBER;
const { EXPENSE_ERRORS } = ERROR_CODES;
const { NOT_FOUND } = StatusCodes;

const getSingleExpenseService = async (expenseId) => {
  const expense = await Expense.findById(expenseId)
    .populate(EXPENSE_FIELDS.PAYER, MEMBER_FIELDS.NAME)
    .populate(EXPENSE_FIELDS.BENEFICIARIES, MEMBER_FIELDS.NAME)
    .lean();

  if (!expense) {
    throw new ApiError(NOT_FOUND, EXPENSE_ERRORS.NOT_FOUND);
  }

  return expense;
};

export default getSingleExpenseService;
