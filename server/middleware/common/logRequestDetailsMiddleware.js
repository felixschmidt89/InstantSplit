import API_HEADER_CONSTANTS from '../../../shared/constants/api/apiHeaderConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { HEADERS } = API_HEADER_CONSTANTS;
const { GROUPCODE } = HEADERS;
const { INFO } = LOG_LEVELS;

const logRequestDetailsMiddleware = (req, res, next) => {
  req.context = req.context ?? {};

  const { method, originalUrl, params, query, headers } = req;

  const hasParams = Boolean(Object.keys(params).length);
  const hasQuery = Boolean(Object.keys(query).length);

  const groupHeaderValue = headers[GROUPCODE];
  const hasGroupHeader = Boolean(groupHeaderValue);

  const loggingContext = {
    method,
    path: originalUrl,
    ...(hasParams && { params }),
    ...(hasQuery && { query }),
    ...(hasGroupHeader && { [GROUPCODE]: groupHeaderValue }),
  };

  debugLog('[API-INBOUND]', loggingContext, INFO);

  next();
};

export default logRequestDetailsMiddleware;
