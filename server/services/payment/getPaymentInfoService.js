import Payment from '../../models/Payment.js';

const getPaymentInfoService = async (paymentId) => {
  const payment = await Payment.findById(paymentId).lean();

  return payment;
};

export default getPaymentInfoService;
