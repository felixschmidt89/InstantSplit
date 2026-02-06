import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, TOTAL } = API_ROUTES.EXPENSES;

export const fetchGroupExpensesTotal = async (groupCode) => {
  debugLog("Fetching group expenses total", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${BASE}/${TOTAL}/${groupCode}`,
    );

    debugLog(
      "Group expenses total fetched",
      { expensesTotal: data?.expensesTotal },
      INFO,
    );

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
