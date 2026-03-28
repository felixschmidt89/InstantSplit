import { StatusCodes } from 'http-status-codes';
import updatePaymentService from '../../services/payment/updatePaymentService.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { OK, NOT_FOUND, CONFLICT } = StatusCodes;
const { PAYMENT_KEYS } = PAYLOAD_KEYS;
const { PAYMENT_ID } = API_ROUTES.URL_PARAMS;
const { PAYMENT_ERRORS } = ERROR_CODES.PAYMENT_ERRORS;

const updatePaymentController = async (req, res, next) => {
  try {
    const { [PAYMENT_ID]: paymentId } = req.params;
    const {
      [PAYMENT_KEYS.MAKER]: paymentMaker,
      [PAYMENT_KEYS.RECIPIENT]: paymentRecipient,
      [PAYMENT_KEYS.AMOUNT]: paymentAmount,
    } = req.body;

    if (paymentMaker && paymentRecipient && paymentMaker === paymentRecipient) {
      return res.status(CONFLICT).json({
        success: false,
        error: PAYMENT_ERRORS.SAME_MAKER_RECIPIENT,
      });
    }

    const updatedPayment = await updatePaymentService(paymentId, {
      paymentMaker,
      paymentRecipient,
      paymentAmount,
    });

    if (!updatedPayment) {
      return res.status(NOT_FOUND).json({
        success: false,
        error: PAYMENT_ERRORS.NOT_FOUND,
      });
    }

    return res.status(OK).json({
      success: true,
      data: { payment: updatedPayment },
    });
  } catch (error) {
    next(error);
  }
};

export default updatePaymentController;
