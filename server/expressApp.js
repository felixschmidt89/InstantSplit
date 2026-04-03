import compression from 'compression';
import cors from 'cors';
import express from 'express';

import API_ROUTES from '../shared/constants/api/apiRouteConstants.js';
import serverConfig from './config/server/serverConfig.js';
import extractGroupCodeMiddleware from './middleware/context/extractGroupCodeMiddleware.js';
import apiErrorMiddleware from './middleware/errors/apiErrorMiddleware.js';
import expenseRouter from './routes/expenseRouter.js';

import groupRouter from './routes/groupRouter.js';
import healthRouter from './routes/healthRouter.js';
import memberRouter from './routes/memberRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import settlementRouter from './routes/settlementRouter.js';

const { EXPENSES, GROUPS, HEALTH, MEMBERS, PAYMENTS, SETTLEMENTS, URL_PARAMS } =
  API_ROUTES;
const { API_BASEURL, TRUST_PROXY } = serverConfig;

const app = express();

if (TRUST_PROXY) {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(cors());
app.use(compression());

app.use(extractGroupCodeMiddleware);

app.use(`${API_BASEURL}/${GROUPS.BASE}`, groupRouter);

// Resource Routes
const GROUP_SCOPE = `${API_BASEURL}/${GROUPS.BASE}/:${URL_PARAMS.GROUP_ID}`;
app.use(`${GROUP_SCOPE}/${MEMBERS.BASE}`, memberRouter);
app.use(`${GROUP_SCOPE}/${EXPENSES.BASE}`, expenseRouter);
app.use(`${GROUP_SCOPE}/${PAYMENTS.BASE}`, paymentRouter);
app.use(`${GROUP_SCOPE}/${SETTLEMENTS.BASE}`, settlementRouter);

// System Routes
app.use(`${API_BASEURL}/${HEALTH.BASE}`, healthRouter);

app.use(apiErrorMiddleware);

export default app;
