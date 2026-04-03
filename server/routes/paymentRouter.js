import express from 'express';
import createPaymentController from '../controllers/payment/createPaymentController.js';
import getPaymentInfoController from '../controllers/payment/getPaymentInfoController.js';
import updatePaymentController from '../controllers/payment/updatePaymentController.js';
import deletePaymentController from '../controllers/payment/deletePaymentController.js';
import resetSettlementsMiddleware from '../middleware/group/resetSettlementsMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { URL_PARAMS } = API_ROUTES;
const { PAYMENT_ID } = URL_PARAMS;

const paymentRouter = express.Router({ mergeParams: true });

paymentRouter.use(touchGroupLastActiveMiddleware);

paymentRouter.post('/', resetSettlementsMiddleware, createPaymentController);

paymentRouter.get(`/:${PAYMENT_ID}`, getPaymentInfoController);

paymentRouter.patch(
  `/:${PAYMENT_ID}`,
  resetSettlementsMiddleware,
  updatePaymentController,
);

paymentRouter.delete(
  `/:${PAYMENT_ID}`,
  resetSettlementsMiddleware,
  deletePaymentController,
);

export default paymentRouter;
