import { StatusCodes } from 'http-status-codes';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import MEMBER_CONSTANTS from '../../../shared/constants/models/memberConstants.js';
import Expense from '../../models/Expense.js';
import ApiError from '../../utils/errors/ApiError.js';

const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { MEMBER_FIELDS } = MEMBER_CONSTANTS;

const getSingleExpenseService = async (expenseId) => {
  const expense = await Expense.findById(expenseId)
    .populate(EXPENSE_FIELDS.PAYER, MEMBER_FIELDS.NAME)
    .populate(EXPENSE_FIELDS.BENEFICIARIES, MEMBER_FIELDS.NAME)
    .lean();

  if (!expense) {
    throw new ApiError('Expense not found', StatusCodes.NOT_FOUND);
  }

  return expense;
};

export default getSingleExpenseService;
