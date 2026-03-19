import SYSTEM from "../../constants/system/systemConstants.js";

const { SORT_ORDER } = SYSTEM;
const { ASCENDING, DESCENDING } = SORT_ORDER;

/**
 * Sorts an array of objects by a specific date key.
 * @param {Array} array - The array of objects to sort.
 * @param {string} dateKey - The object property containing the date value.
 * @param {string} order - The sort direction (must match SORT_ORDER values).
 * @returns {Array} - A new sorted array or the original input if invalid.
 */
const sortByDate = (array, dateKey, order) => {
  const isAllowedOrder = Boolean(order === ASCENDING || order === DESCENDING);
  const hasValidInput = Boolean(
    Array.isArray(array) && dateKey && isAllowedOrder,
  );

  if (!hasValidInput) {
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
