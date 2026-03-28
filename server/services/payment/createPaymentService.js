import { StatusCodes } from 'http-status-codes';
import PAYMENT from '../../../shared/constants/models/paymentConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';
import { resetGroupSettlements } from '../../utils/group/resetGroupSettlements.js';

const { CONFLICT, NOT_FOUND } = StatusCodes;
const { PAYMENT_FIELDS } = PAYMENT;
const { COMMON_FIELDS } = COMMON;
const { PAYMENT_ERRORS, MEMBER_ERRORS } = ERROR_CODES;

const createPaymentService = async (paymentData) => {
  const { makerId, recipientId, amount, groupCode } = paymentData;

  if (makerId === recipientId) {
    throw new ApiError(CONFLICT, PAYMENT_ERRORS.MAKER_RECIPIENT_SAME);
  }

  const [maker, recipient] = await Promise.all([
    Member.findOne({
      [COMMON_FIELDS.ID]: makerId,
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    }),
    Member.findOne({
      [COMMON_FIELDS.ID]: recipientId,
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    }),
  ]);

  if (!maker || !recipient) {
    throw new ApiError(NOT_FOUND, MEMBER_ERRORS.NOT_FOUND);
  }

  const payment = await Payment.create({
    [PAYMENT_FIELDS.MAKER]: makerId,
    [PAYMENT_FIELDS.RECIPIENT]: recipientId,
    [PAYMENT_FIELDS.AMOUNT]: amount,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  });

  // TODO: Consider optimizing this by using bulk operations or embedding payment summaries in the Member model to avoid multiple queries and updates.
  await Promise.all([
    maker.updateTotalPaymentsMadeAmount(),
    recipient.updateTotalPaymentsReceived(),
    resetGroupSettlements(groupCode),
  ]);

  return payment;
};

export default createPaymentService;
