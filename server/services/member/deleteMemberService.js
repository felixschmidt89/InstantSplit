import Member from '../../models/Member.js';
import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';
import ApiError from '../../utils/errors/ApiError.js';

const deleteMemberService = async (memberId) => {
  const [associatedExpenses, associatedPayments] = await Promise.all([
    Expense.find({
      $or: [{ expensePayer: memberId }, { expenseBeneficiaries: memberId }],
    }),
    Payment.find({
      $or: [{ paymentMaker: memberId }, { paymentRecipient: memberId }],
    }),
  ]);

  const hasActiveFinancialHistory =
    associatedExpenses.length > 0 || associatedPayments.length > 0;

  if (hasActiveFinancialHistory) {
    throw ApiError.badRequest(
      'User has associated transactions. Please remove the user from all transactions.',
    );
  }

  const deletedMember = await Member.findByIdAndDelete(memberId);

  const memberNotFound = !deletedMember;

  if (memberNotFound) {
    throw ApiError.notFound('Member not found.');
  }

  return deletedMember;
};

export default deleteMemberService;
