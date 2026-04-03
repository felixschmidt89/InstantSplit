import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';

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

  const uniqueAffectedIds = [
    ...new Set(affectedIds.map((id) => id.toString())),
  ];

  await Member.refreshTotals(uniqueAffectedIds);

  return updatedPayment;
};

export default updatePaymentService;
