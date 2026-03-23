import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.EXPENSES;

const updateExpense = async (expenseId, payload) => {
  try {
    const { data } = await apiClient.put(`/${BASE}/${expenseId}`, payload);

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

export default updateExpense;
