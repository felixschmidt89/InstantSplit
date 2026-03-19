import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';
import { LOG_LEVELS } from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { GROUPCODE } = API_HEADERS;
const { INFO } = LOG_LEVELS;

const logRequestDetailsMiddleware = (req, res, next) => {
  req.context = req.context ?? {};

  const { method, originalUrl, params, query, headers } = req;

  const hasParams = Boolean(Object.keys(params).length);
  const hasQuery = Boolean(Object.keys(query).length);
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
