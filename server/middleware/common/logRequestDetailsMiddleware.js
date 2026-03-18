import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

const logRequestDetailsMiddleware = (req, res, next) => {
  req.context = req.context ?? {};

  const { method, originalUrl, params, query, headers } = req;

  const hasParams = Boolean(Object.keys(params).length);
  const hasQuery = Boolean(Object.keys(query).length);
  const hasGroupHeader = Boolean(headers[GROUPCODE.toLowerCase()]);

  const loggingContext = {
    method,
    path: originalUrl,
    ...(hasParams && { params }),
    ...(hasQuery && { query }),
    ...(hasGroupHeader && { [GROUPCODE]: headers[GROUPCODE.toLowerCase()] }),
  };

  debugLog('[API-INBOUND]', loggingContext, INFO);

  next();
};

export default logRequestDetailsMiddleware;
