import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
// import resetGroupSettlementsService from '../group/resetGroupSettlementsService.js';

const updatePaymentService = async (paymentId, updateData) => {
  const oldPayment = await Payment.findById(paymentId).lean();
  if (!oldPayment) return null;

  const updatedPayment = await Payment.findByIdAndUpdate(
    paymentId,
    updateData,
    { new: true, runValidators: true },
  );

  const affectedIds = [
    oldPayment.paymentMaker,
    oldPayment.paymentRecipient,
    updatedPayment.paymentMaker,
    updatedPayment.paymentRecipient,
  ];

  await Promise.all([
    Member.refreshTotals(affectedIds),
    // TODO: Handle reset
    // resetGroupSettlementsService(updatedPayment.groupCode),
  ]);

  return updatedPayment;
};

export default updatePaymentService;
