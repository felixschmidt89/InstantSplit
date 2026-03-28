import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
// import resetGroupSettlementsService from '../group/resetGroupSettlementsService.js';

const deletePaymentService = async (paymentId) => {
  const payment = await Payment.findById(paymentId).lean();

  if (!payment) return null;

  await Payment.findByIdAndDelete(paymentId);

  const affectedIds = [payment.paymentMaker, payment.paymentRecipient];

  await Promise.all([
    Member.refreshTotals(affectedIds),
    //TODO: Handle reset
    // resetGroupSettlementsService(payment.groupCode),
  ]);

  return true;
};

export default deletePaymentService;
