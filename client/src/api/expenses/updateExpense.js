import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.EXPENSES;

export const updateExpense = async (expenseId, payload) => {
  debugLog("Updating expense", { expenseId, payload }, INFO);

  try {
    const { data } = await axios.put(
      `${API_URL}/${BASE}/${expenseId}`,
      payload,
    );

    debugLog("Expense updated successfully", { data }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error updating expense",
      { error: error.message, expenseId },
      LOG_ERROR,
    );
    throw error;
  }
};
