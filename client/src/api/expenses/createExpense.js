import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/api/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.EXPENSES;

export const createExpense = async (payload) => {
  try {
    const { data } = await apiClient.post(`/${BASE}`, payload);

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
