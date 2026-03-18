import express from 'express';
import cors from 'cors';
import compression from 'compression';

import serverConfig from './config/serverConfig.js';
import extractGroupCodeMiddleware from './middleware/context/extractGroupCodeMiddleware.js';
import apiErrorMiddleware from './middleware/errors/apiErrorMiddleware.js';
import groupRouter from './routes/groupRouter.js';
import memberRouter from './routes/memberRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import healthRouter from './routes/healthRouter.js';
import fileRouter from './routes/fileRouter.js';
import captchaRouter from './routes/captchaRouter.js';
import settlementRouter from './routes/settlementRouter.js';
import API_ROUTES from '../shared/constants/api/apiRoutesConstants.js/index.js';

const {
  GROUPS,
  MEMBERS,
  EXPENSES,
  PAYMENTS,
  HEALTH,
  FILES,
  CAPTCHAS,
  SETTLEMENTS,
} = API_ROUTES;

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
app.use(`${API_BASEURL}/${MEMBERS.BASE}`, memberRouter);
app.use(`${API_BASEURL}/${EXPENSES.BASE}`, expenseRouter);
app.use(`${API_BASEURL}/${PAYMENTS.BASE}`, paymentRouter);
app.use(`${API_BASEURL}/${HEALTH.BASE}`, healthRouter);
app.use(`${API_BASEURL}/${FILES.BASE}`, fileRouter);
app.use(`${API_BASEURL}/${CAPTCHAS.BASE}`, captchaRouter);
app.use(`${API_BASEURL}/${SETTLEMENTS.BASE}`, settlementRouter);

app.use(apiErrorMiddleware);

export default app;
