import { StatusCodes } from 'http-status-codes';
import createPaymentService from '../../services/payment/createPaymentService.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { CREATED, CONFLICT } = StatusCodes;
const { PAYMENT_KEYS } = PAYLOAD_KEYS;
const { PAYMENT_ERRORS } = ERROR_CODES;

const createPaymentController = async (req, res, next) => {
  try {
    const {
      [PAYMENT_KEYS.MAKER]: paymentMaker,
      [PAYMENT_KEYS.RECIPIENT]: paymentRecipient,
      [PAYMENT_KEYS.AMOUNT]: paymentAmount,
    } = req.body;

    const { groupCode } = req.context;

    if (paymentMaker === paymentRecipient) {
      return res.status(CONFLICT).json({
        success: false,
        error: PAYMENT_ERRORS.SAME_MAKER_RECIPIENT,
      });
    }

    const payment = await createPaymentService({
      paymentMaker,
      paymentRecipient,
      paymentAmount,
      groupCode,
    });

    return res.status(CREATED).json({
      success: true,
      data: { payment },
    });
  } catch (error) {
    next(error);
  }
};

export default createPaymentController;
