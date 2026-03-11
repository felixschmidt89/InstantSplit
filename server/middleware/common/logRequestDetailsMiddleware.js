import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

export const logRequestDetailsMiddleware = (req, res, next) => {
  const { method, originalUrl, params, query, headers } = req;

  const headerKey = GROUPCODE.toLowerCase();
  const hasParams = Object.keys(params).length > 0;
  const hasQuery = Object.keys(query).length > 0;
  const hasGroupHeader = Boolean(headers[headerKey]);

  const context = {
    method,
    path: originalUrl,
    ...(hasParams && { params }),
    ...(hasQuery && { query }),
    ...(hasGroupHeader && { [headerKey]: headers[headerKey] }),
  };

  debugLog(`[API-INBOUND]`, context, INFO);

  next();
};

export default logRequestDetailsMiddleware;
