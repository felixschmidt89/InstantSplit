import SYSTEM from "../../constants/system/systemConstants.js";
import LOG_LEVELS from "../../constants/system/loggerConstants.js";
import debugLog from "../debug/debugLog.js";

const { SORT_ORDER } = SYSTEM;
const { ASCENDING, DESCENDING } = SORT_ORDER;
const { WARN } = LOG_LEVELS;

const sortByDate = (array, dateKey, order = DESCENDING) => {
  const isAllowedOrder = Boolean(order === ASCENDING || order === DESCENDING);
  const hasValidInput = Boolean(
    Array.isArray(array) && dateKey && isAllowedOrder,
  );

  if (!hasValidInput) {
    if (Array.isArray(array) && Boolean(array.length)) {
      debugLog(
        `Invalid sort attempt on dateKey: "${dateKey}" with order: "${order}"`,
        { dateKey, order, arrayLength: array.length },
        WARN,
      );
    }
    return array || [];
  }

  const isAscending = order === ASCENDING;

  return [...array].sort((a, b) => {
    const timeA = a[dateKey] ? new Date(a[dateKey]).getTime() : 0;
    const timeB = b[dateKey] ? new Date(b[dateKey]).getTime() : 0;

    return isAscending ? timeA - timeB : timeB - timeA;
  });
};

export default sortByDate;
