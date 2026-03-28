import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
import resetGroupSettlementsService from '../group/resetGroupSettlementsService.js';

const updatePaymentService = async (paymentId, updateData) => {
  const oldPayment = await Payment.findById(paymentId).lean();
  if (!oldPayment) return null;

  const updatedPayment = await Payment.findByIdAndUpdate(
    paymentId,
    updateData,
    { new: true, runValidators: true },
  );

  const affectedMemberIds = [
    oldPayment.paymentMaker,
    oldPayment.paymentRecipient,
    updatedPayment.paymentMaker,
    updatedPayment.paymentRecipient,
  ];

  const uniqueMemberIds = [
    ...new Set(affectedMemberIds.map((id) => id.toString())),
  ];

  await Promise.all(
    uniqueMemberIds.map(async (id) => {
      const member = await Member.findById(id);
      if (member) {
        await member.updateTotalPaymentsMadeAmount();
        await member.updateTotalPaymentsReceived();
      }
    }),
  );

  // 4. Invalidate settlements
  await resetGroupSettlementsService(updatedPayment.groupCode);

  return updatedPayment;
};

export default updatePaymentService;
