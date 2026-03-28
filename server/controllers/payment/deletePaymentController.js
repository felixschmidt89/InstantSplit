import { StatusCodes } from 'http-status-codes';
import deletePaymentService from '../../services/payment/deletePaymentService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { NO_CONTENT, NOT_FOUND } = StatusCodes;
const { PAYMENT_ID } = API_ROUTES.URL_PARAMS;
const { PAYMENT_ERRORS } = ERROR_CODES.PAYMENT_ERRORS;

const deletePaymentController = async (req, res, next) => {
  try {
    const { [PAYMENT_ID]: paymentId } = req.params;

    const isDeleted = await deletePaymentService(paymentId);

    if (!isDeleted) {
      return res.status(NOT_FOUND).json({
        success: false,
        error: PAYMENT_ERRORS.NOT_FOUND,
      });
    }

    return res.status(NO_CONTENT).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export default deletePaymentController;
