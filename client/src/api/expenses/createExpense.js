import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.EXPENSES;

export const createExpense = async (payload) => {
  debugLog("Creating expense with payload:", payload, INFO);

  try {
    const { data } = await axios.post(`${API_URL}/${BASE}`, payload);

    debugLog("Expense created successfully", { id: data?._id }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error creating expense",
      { error: error.message, payload },
      LOG_ERROR,
    );
    throw error;
  }
};
