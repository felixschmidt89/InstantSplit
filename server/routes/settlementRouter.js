import express from 'express';
import createSettlementsController from '../controllers/settlement/createSettlementsController.js';
import calculateSettlementsController from '../controllers/settlement/calculateSettlementsController.js';
import deleteSingleSettlementController from '../controllers/settlement/deleteSingleSettlementController.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { URL_PARAMS, SETTLEMENTS } = API_ROUTES;
const { SETTLEMENT_ID } = URL_PARAMS;
const { CALCULATE } = SETTLEMENTS;

const settlementRouter = express.Router({ mergeParams: true });

settlementRouter.use(touchGroupLastActiveMiddleware);

settlementRouter.post('/', createSettlementsController);

settlementRouter.get(`/${CALCULATE}`, calculateSettlementsController);

settlementRouter.delete(`/:${SETTLEMENT_ID}`, deleteSingleSettlementController);

export default settlementRouter;
