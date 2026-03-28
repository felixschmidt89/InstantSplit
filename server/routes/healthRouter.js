import express from 'express';

import checkHealthController from '../controllers/health/checkHealthController.js';

import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { HEALTH } = API_ROUTES;

const healthRouter = express.Router();

healthRouter.get(`/${HEALTH.CHECK}`, checkHealthController);

export default healthRouter;
