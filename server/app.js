import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import healthRouter from './routes/healthRouter.js';
import fileRouter from './routes/fileRouter.js';
import captchaRouter from './routes/captchaRouter.js';
import settlementRouter from './routes/settlementRouter.js';

// Create an express application
const app = express();

// Access the initial NODE_ENV environment variable
const nodeEnv = process.env.NODE_ENV;

// Load environment variables based on initial NODE_ENV
if (nodeEnv === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}

// Destructure loaded environment variables
const { API_BASEURL, NODE_ENV } = process.env;

// MIDDLEWARES
// Parse request bodies as JSON
app.use(express.json());
// Enable CORS
app.use(cors());
// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });
// Enable GZIP compression to reduce response size for faster loading
app.use(compression());

// ROUTES
app.use(`${API_BASEURL}/groups`, groupRouter);
app.use(`${API_BASEURL}/users`, userRouter);
app.use(`${API_BASEURL}/expenses`, expenseRouter);
app.use(`${API_BASEURL}/payments`, paymentRouter);
app.use(`${API_BASEURL}/feedbacks`, feedbackRouter);
app.use(`${API_BASEURL}/health`, healthRouter);
app.use(`${API_BASEURL}/files`, fileRouter);
app.use(`${API_BASEURL}/captchas`, captchaRouter);
app.use(`${API_BASEURL}/settlements`, settlementRouter);

export default app;
