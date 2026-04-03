import API_HEADER_CONSTANTS from '../../../shared/constants/api/apiHeaderConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { HEADERS } = API_HEADER_CONSTANTS;
const { GROUPCODE } = HEADERS;
const { INFO } = LOG_LEVELS;

const debugLogRequestMiddleware = (req, res, next) => {
  req.context = req.context ?? {};

  const { method, originalUrl, params, query, headers } = req;

  const hasParams = Object.keys(params).length > 0;
  const hasQuery = Object.keys(query).length > 0;

  const groupHeaderValue = headers[GROUPCODE];

  const loggingContext = {
    method,
    path: originalUrl,
    ...(hasParams && { params }),
    ...(hasQuery && { query }),
    ...(groupHeaderValue && {
      [GROUPCODE]: `${groupHeaderValue.substring(0, 3)}***`,
    }),
  };

  debugLog('[API-INBOUND]', loggingContext, INFO);

  next();
};

export default debugLogRequestMiddleware;
