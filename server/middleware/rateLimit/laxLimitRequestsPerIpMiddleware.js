import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { TOO_MANY_REQUESTS } = StatusCodes;
const { RATE_LIMIT_LAX_WINDOW_MS, RATE_LIMIT_LAX_MAX_REQUESTS } = SYSTEM;
const { GENERIC_ERRORS } = ERROR_CODES;

const laxLimiter = rateLimit({
  windowMs: RATE_LIMIT_LAX_WINDOW_MS,
  max: RATE_LIMIT_LAX_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => next(),
});

const laxLimitRequestsPerIpMiddleware = (req, res, next) => {
  const { rateLimit: limit } = req;

  if (limit && limit.remaining === 0) {
    // TODO: Optimize response when working on translations
    return res.status(TOO_MANY_REQUESTS).json({
      success: false,
      code: GENERIC_ERRORS.TOO_MANY_REQUESTS,
    });
  }

  next();
};

export { laxLimiter, laxLimitRequestsPerIpMiddleware };
