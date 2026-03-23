import apiClient from "../axiosInstance.js";

import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TRANSACTIONS } = API_ROUTES.MEMBERS;

const fetchGroupMemberTransactions = async (memberId) => {
  try {
    const { data } = await apiClient.get(
      `/${BASE}/${memberId}/${TRANSACTIONS}`,
    );
    return data;
  } catch (apiError) {
    debugLog(
      "Error fetching group member transactions",
      {
        error: apiError.message,
        memberId,
        status: apiError.response?.status,
      },
      LOG_ERROR,
    );
    throw apiError;
  }
};

export default fetchGroupMemberTransactions;
