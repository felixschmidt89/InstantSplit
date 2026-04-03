import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { SORT_ORDER } = SYSTEM;
const { ASCENDING, DESCENDING } = SORT_ORDER;
const { WARN } = LOG_LEVELS;

const getMongooseSortOrder = (order) => {
  const isAllowedOrder = Boolean(order === ASCENDING || order === DESCENDING);

  if (!isAllowedOrder) {
    debugLog(
      `Invalid sort order received: "${order}". Falling back to DESCENDING.`,
      {
        receivedValue: order,
        fallback: DESCENDING,
        allowed: [ASCENDING, DESCENDING],
      },
      WARN,
    );
    return -1;
  }

  return order === ASCENDING ? 1 : -1;
};

export default getMongooseSortOrder;
