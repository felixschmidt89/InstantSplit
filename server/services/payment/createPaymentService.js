import { StatusCodes } from 'http-status-codes';
import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import { resetGroupSettlements } from '../../utils/group/resetGroupSettlements.js';

const createPaymentService = async (paymentData) => {
  const { makerId, recipientId, amount, groupCode } = paymentData;

  if (makerId === recipientId) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Maker and recipient cannot be the same person',
    );
  }

  const [maker, recipient] = await Promise.all([
    Member.findOne({
      [COMMON.FIELDS.ID]: makerId,
      [COMMON.FIELDS.GROUP_CODE]: groupCode,
    }),
    Member.findOne({
      [COMMON.FIELDS.ID]: recipientId,
      [COMMON.FIELDS.GROUP_CODE]: groupCode,
    }),
  ]);

  if (!maker) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Payment maker (ID: ${makerId}) not found in group ${groupCode}`,
    );
  }

  if (!recipient) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Payment recipient (ID: ${recipientId}) not found in group ${groupCode}`,
    );
  }

  const payment = new Payment({
    [PAYMENT.FIELDS.MAKER]: makerId,
    [PAYMENT.FIELDS.RECIPIENT]: recipientId,
    [PAYMENT.FIELDS.AMOUNT]: amount,
    [COMMON.FIELDS.GROUP_CODE]: groupCode,
  });

  await payment.save();

  await Promise.all([
    maker.updateTotalPaymentsMadeAmount(),
    recipient.updateTotalPaymentsReceived(),
    resetGroupSettlements(groupCode),
  ]);

  return payment;
};

export default createPaymentService;
