import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TOTAL } = API_ROUTES.EXPENSES;

export const fetchGroupExpensesTotal = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${TOTAL}/${groupCode}`);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group expenses total",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
