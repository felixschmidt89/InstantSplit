import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';

const deletePaymentService = async (paymentId) => {
  const payment = await Payment.findById(paymentId).lean();

  if (!payment) return null;

  await Payment.findByIdAndDelete(paymentId);

  const affectedMemberIds = [payment.paymentMaker, payment.paymentRecipient];

  await Member.refreshTotals(affectedMemberIds);

  return true;
};

export default deletePaymentService;
