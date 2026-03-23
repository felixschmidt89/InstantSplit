import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.SETTLEMENTS;

const fetchSettlements = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${groupCode}`);
    return data;
  } catch (error) {
    debugLog(
      "Error fetching settlements",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};

export default fetchSettlements;
