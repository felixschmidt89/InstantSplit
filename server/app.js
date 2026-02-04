import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import multer from 'multer';

import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import healthRouter from './routes/healthRouter.js';
import fileRouter from './routes/fileRouter.js';
import captchaRouter from './routes/captchaRouter.js';
import settlementRouter from './routes/settlementRouter.js';
import { API_ROUTES } from '../shared/constants/apiRoutesConstants.js';

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}

const {
  GROUPS,
  USERS,
  EXPENSES,
  PAYMENTS,
  FEEDBACKS,
  HEALTH,
  FILES,
  CAPTCHAS,
  SETTLEMENTS,
} = API_ROUTES;

const app = express();

app.set('trust proxy', 1);

const { API_BASEURL } = process.env;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' });
app.use(compression());

// ROUTES
app.use(`${API_BASEURL}/${GROUPS.BASE}`, groupRouter);
app.use(`${API_BASEURL}/${USERS.BASE}`, userRouter);
app.use(`${API_BASEURL}/${EXPENSES.BASE}`, expenseRouter);
app.use(`${API_BASEURL}/${PAYMENTS.BASE}`, paymentRouter);
app.use(`${API_BASEURL}/${FEEDBACKS.BASE}`, feedbackRouter);
app.use(`${API_BASEURL}/${HEALTH.BASE}`, healthRouter);
app.use(`${API_BASEURL}/${FILES.BASE}`, fileRouter);
app.use(`${API_BASEURL}/${CAPTCHAS.BASE}`, captchaRouter);
app.use(`${API_BASEURL}/${SETTLEMENTS.BASE}`, settlementRouter);

export default app;
