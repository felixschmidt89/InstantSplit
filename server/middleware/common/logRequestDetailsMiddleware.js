import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

export const logRequestDetailsMiddleware = (req, res, next) => {
  const { method, originalUrl, params, query, headers } = req;

  const headerKey = GROUPCODE.toLowerCase();

  const context = {
    method,
    path: originalUrl,
    ...(Object.keys(params).length > 0 && { params }),
    ...(Object.keys(query).length > 0 && { query }),
    ...(headers[headerKey] && { [headerKey]: headers[headerKey] }),
  };

  debugLog(`[API-INBOUND]`, context, INFO);

  next();
};
