import { debugLog, INFO } from '../../../shared/utils/debug/debugLog.js';
import { API_HEADERS } from '../../../shared/constants/api/apiHeaderConstants.js';

const { GROUPCODE } = API_HEADERS;

const extractGroupCodeMiddleware = (req, res, next) => {
  const groupCode = req.headers[GROUPCODE];

  if (groupCode) {
    req.groupCode = groupCode;

    debugLog('Middleware: Group Code Extracted', { groupCode }, INFO);
  }

  next();
};

export default extractGroupCodeMiddleware;
