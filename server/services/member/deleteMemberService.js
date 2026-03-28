import { StatusCodes } from 'http-status-codes';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Member from '../../models/Member.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';
import ApiError from '../../utils/errors/ApiError.js';

const { BAD_REQUEST, NOT_FOUND } = StatusCodes;
const { COMMON_FIELDS } = COMMON;
const { EXPENSE_FIELDS } = EXPENSE;
const { PAYMENT_FIELDS } = PAYMENT;
const { MEMBER_ERRORS } = ERROR_CODES;

const deleteMemberService = async (memberId, groupCode) => {
  const [associatedExpenses, associatedPayments] = await Promise.all([
    Expense.find({
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
      $or: [
        { [EXPENSE_FIELDS.PAYER]: memberId },
        { [EXPENSE_FIELDS.BENEFICIARIES]: memberId },
      ],
    }).lean(),
    Payment.find({
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
      $or: [
        { [PAYMENT_FIELDS.MAKER]: memberId },
        { [PAYMENT_FIELDS.RECIPIENT]: memberId },
      ],
    }).lean(),
  ]);

  if (associatedExpenses.length > 0 || associatedPayments.length > 0) {
    throw new ApiError(BAD_REQUEST, MEMBER_ERRORS.HAS_TRANSACTIONS);
  }

  const deletedMember = await Member.findOneAndDelete({
    [COMMON_FIELDS.ID]: memberId,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }).lean();

  if (!deletedMember) {
    throw new ApiError(NOT_FOUND, MEMBER_ERRORS.NOT_FOUND);
  }

  return deletedMember;
};

export default deleteMemberService;
