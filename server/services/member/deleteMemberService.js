import Member from '../../models/Member.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';
import ApiError from '../../utils/errors/ApiError.js';

import { EXPENSE_FIELDS } from '../../../shared/constants/models/expenseConstants.js';
import { PAYMENT_FIELDS } from '../../../shared/constants/models/paymentConstants.js';

const { EXPENSE_PAYER, EXPENSE_BENEFICIARIES } = EXPENSE_FIELDS;
const { PAYMENT_MAKER, PAYMENT_RECIPIENT } = PAYMENT_FIELDS;

const deleteMemberService = async (memberId) => {
  const [associatedExpenses, associatedPayments] = await Promise.all([
    Expense.find({
      $or: [
        { [EXPENSE_PAYER]: memberId },
        { [EXPENSE_BENEFICIARIES]: memberId },
      ],
    }),
    Payment.find({
      $or: [{ [PAYMENT_MAKER]: memberId }, { [PAYMENT_RECIPIENT]: memberId }],
    }),
  ]);

  const hasActiveFinancialHistory =
    associatedExpenses.length > 0 || associatedPayments.length > 0;

  if (hasActiveFinancialHistory) {
    throw ApiError.badRequest(
      'Member has associated transactions. Please remove the member from all transactions.',
    );
  }

  const deletedMember = await Member.findByIdAndDelete(memberId);

  if (!deletedMember) {
    throw ApiError.notFound('Member not found.');
  }

  return deletedMember;
};

export default deleteMemberService;
