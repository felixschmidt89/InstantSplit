import Member from '../../models/Member.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';
import ApiError from '../../utils/errors/ApiError.js';

import EXPENSE from '../../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';

const deleteMemberService = async (memberId) => {
  const [associatedExpenses, associatedPayments] = await Promise.all([
    Expense.find({
      $or: [
        { [EXPENSE.FIELDS.PAYER]: memberId },
        { [EXPENSE.FIELDS.BENEFICIARIES]: memberId },
      ],
    }),
    Payment.find({
      $or: [
        { [PAYMENT.FIELDS.MAKER]: memberId },
        { [PAYMENT.FIELDS.RECIPIENT]: memberId },
      ],
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
