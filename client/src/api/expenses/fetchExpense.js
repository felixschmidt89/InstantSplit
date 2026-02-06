import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.EXPENSES;

export const fetchExpense = async (expenseId) => {
  debugLog("Fetching expense info", { expenseId }, INFO);

  try {
    const { data } = await axios.get(`${API_URL}/${BASE}/${expenseId}`);

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
