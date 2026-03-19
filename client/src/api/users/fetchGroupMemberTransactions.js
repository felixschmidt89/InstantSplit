import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TRANSACTIONS } = API_ROUTES.USERS;

const fetchGroupMemberTransactions = async (userId) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${userId}/${TRANSACTIONS}`);
    return data;
  } catch (error) {
    debugLog(
      "Error fetching group member transactions",
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};

export default fetchGroupMemberTransactions;
