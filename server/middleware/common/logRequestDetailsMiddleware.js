import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

export const logRequestDetailsMiddleware = (req, res, next) => {
  req.context = req.context ?? {};

  const { method, originalUrl, params, query, headers } = req;

  const hasParams = Object.keys(params).length > 0;
  const hasQuery = Object.keys(query).length > 0;
  const hasGroupHeader = Boolean(headers[GROUPCODE]);

  const loggingContext = {
    method,
    path: originalUrl,
    ...(hasParams && { params }),
    ...(hasQuery && { query }),
    ...(hasGroupHeader && { [GROUPCODE]: headers[GROUPCODE] }),
  };

  debugLog('[API-INBOUND]', loggingContext, INFO);

  next();
};

export default logRequestDetailsMiddleware;
