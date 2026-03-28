import express from 'express';

import createPaymentController from '../controllers/payment/createPaymentController.js';
import getPaymentInfoController from '../controllers/payment/getPaymentInfoController.js';
import updatePaymentController from '../controllers/payment/updatePaymentController.js';
import deletePaymentController from '../controllers/payment/deletePaymentController.js';

import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { URL_PARAMS } = API_ROUTES;
const { PAYMENT_ID } = URL_PARAMS;

const paymentRouter = express.Router();

paymentRouter.post('/', createPaymentController);

paymentRouter.get(`/:${PAYMENT_ID}`, getPaymentInfoController);

paymentRouter.patch(`/:${PAYMENT_ID}`, updatePaymentController);

paymentRouter.delete(`/:${PAYMENT_ID}`, deletePaymentController);

export default paymentRouter;
