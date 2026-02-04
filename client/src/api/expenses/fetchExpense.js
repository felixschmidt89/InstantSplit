import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { EXPENSES } = ENDPOINTS;

export const fetchExpense = async (expenseId) => {
  debugLog("Fetching expense info", { expenseId }, INFO);

  try {
    const { data } = await axios.get(`${API_URL}/${EXPENSES}/${expenseId}`);

    debugLog("Expense info fetched", { expense: data?.expense }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching expense info",
      { error: error.message, expenseId },
      LOG_ERROR,
    );
    throw error;
  }
};
