import express from 'express';
import calculateSettlementsController from '../controllers/settlement/calculateSettlementsController.js';
import deleteSettlementController from '../controllers/settlement/deleteSettlementController.js';
// import deleteAllSettlementsController from '../controllers/settlement/deleteAllSettlementsController.js';
// import getAllSettlementsController from '../controllers/settlement/getAllSettlementsController.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { GROUP_ID } = API_ROUTES.URL_PARAMS;
const settlementRouter = express.Router();

// TODO: Rename curret to persistSettlementsController and add calculateSettlementsController, propbaly have to rename model again
// TODO: Pick up from here next time
settlementRouter.post('/', calculateSettlementsController);

settlementRouter.delete('/', deleteSettlementController);

settlementRouter.delete(`/:${GROUP_ID}`, deleteAllSettlementsController);

settlementRouter.get(`/:${GROUP_ID}`, getAllSettlementsController);

export default settlementRouter;
