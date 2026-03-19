import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import API_HEADERS from "../../../../shared/constants/api/apiHeaderConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TRANSACTIONS } = API_ROUTES.GROUPS;
const { GROUPCODE } = API_HEADERS;

const fetchGroupTransactions = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${TRANSACTIONS}`, {
      headers: {
        [GROUPCODE]: groupCode,
      },
    });

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group transactions",
      { error: error.message, groupCode },
      LOG_ERROR,
    );

    throw error;
  }
};

export default fetchGroupTransactions;
