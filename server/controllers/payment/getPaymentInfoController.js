import { StatusCodes } from 'http-status-codes';
import getPaymentInfoService from '../../services/payment/getPaymentInfoService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { OK, NOT_FOUND } = StatusCodes;
const { PAYMENT_ID } = API_ROUTES.URL_PARAMS;
const { PAYMENT_ERRORS } = ERROR_CODES;

const getPaymentInfoController = async (req, res, next) => {
  try {
    const { [PAYMENT_ID]: paymentId } = req.params;

    const payment = await getPaymentInfoService(paymentId);

    if (!payment) {
      return res.status(NOT_FOUND).json({
        success: false,
        error: PAYMENT_ERRORS.NOT_FOUND,
      });
    }

    return res.status(OK).json({
      success: true,
      data: { payment },
    });
  } catch (error) {
    next(error);
  }
};

export default getPaymentInfoController;
