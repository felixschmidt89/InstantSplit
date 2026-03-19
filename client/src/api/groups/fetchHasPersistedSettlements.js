import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, HAS_PERSISTED_ORDER } = API_ROUTES.GROUPS;

const fetchHasPersistedSettlements = async (groupCode) => {
  try {
    const { data } = await apiClient.get(
      // TODO: drop  from urls and endpoints
      `/${BASE}/${HAS_PERSISTED_ORDER}/${groupCode}/`,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error checking persisted settlements status",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};

export default fetchHasPersistedSettlements;
