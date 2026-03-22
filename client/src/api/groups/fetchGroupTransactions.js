import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import API_HEADER_CONSTANTS from "../../../../shared/constants/api/apiHeaderConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TOTAL } = API_ROUTES.GROUPS;

const { HEADERS } = API_HEADER_CONSTANTS;
const { GROUPCODE } = HEADERS;

const fetchGroupExpensesTotal = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${TOTAL}`, {
      headers: {
        [GROUPCODE]: groupCode,
      },
    });

    return data;
  } catch (apiError) {
    debugLog(
      "Error fetching group expenses total",
      {
        error: apiError.message,
        groupCode,
        status: apiError.response?.status,
      },
      LOG_ERROR,
    );

    throw apiError;
  }
};

export default fetchGroupExpensesTotal;
