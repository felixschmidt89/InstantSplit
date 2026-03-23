import apiClient from "../axiosInstance.js";
import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, GROUP_TOTAL } = API_ROUTES.EXPENSES;
const fetchGroupExpensesTotal = async (groupCode) => {
  try {
    const { data } = await apiClient.get(
      `/${BASE}/${GROUP_TOTAL}/${groupCode}`,
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

export default fetchGroupExpensesTotal;
