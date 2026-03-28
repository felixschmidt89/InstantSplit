import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';

const createPaymentService = async (paymentData) => {
  const payment = await Payment.create(paymentData);

  const maker = await Member.findById(payment.paymentMaker);
  const recipient = await Member.findById(payment.paymentRecipient);

  await Promise.all([
    maker.updateTotalPaymentsMadeAmount(),
    recipient.updateTotalPaymentsReceived(),
  ]);

  // TODO: Make this a Middleware
  // 3. Invalidate settlements for the group
  await resetGroupSettlementsService(payment.groupCode);

  return payment;
};

export default createPaymentService;
