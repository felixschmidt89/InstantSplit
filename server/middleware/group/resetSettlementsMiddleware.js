import { StatusCodes } from 'http-status-codes';
import setGroupSettlementsCalculated from '../../utils/database/setGroupSettlementsCalculated.js';
import debugLog from '../../shared/utils/debug/debugLog.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';

const { OK, CREATED, NO_CONTENT } = StatusCodes;
const { ERROR, INFO, WARN } = LOG_LEVELS;

const resetSettlementsMiddleware = (req, res, next) => {
  res.on('finish', () => {
    const { groupCode } = req.context || {};
    const { statusCode, method, originalUrl } = res;

    const successCodes = [OK, CREATED, NO_CONTENT];
    const isSuccessfulMutation = successCodes.includes(statusCode);

    if (!groupCode) {
      debugLog(
        `[ResetSettlements] FAILED: No groupCode found in context for ${method} ${originalUrl}`,
        { method, url: originalUrl },
        ERROR,
      );
      return;
    }

    if (isSuccessfulMutation) {
      debugLog(
        `[ResetSettlements] SUCCESS: ${method} (${statusCode}) for group ${groupCode}. Wiping stale settlements.`,
        { groupCode, statusCode },
        INFO,
      );
      setGroupSettlementsCalculated(groupCode, false);
    } else {
      debugLog(
        `[ResetSettlements] SKIPPED: ${method} returned ${statusCode}. Settlement state preserved for group ${groupCode}.`,
        { groupCode, statusCode },
        WARN,
      );
    }
  });

  next();
};

export default resetSettlementsMiddleware;
