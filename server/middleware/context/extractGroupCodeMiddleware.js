import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

export const extractGroupCodeMiddleware = (req, res, next) => {
  const groupCode = req.headers[GROUPCODE];

  req.context = {
    ...req.context,
    ...(groupCode && { groupCode }),
  };

  if (groupCode) {
    debugLog('Middleware: Group Code Extracted', { groupCode }, INFO);
  }

  next();
};

export default extractGroupCodeMiddleware;
