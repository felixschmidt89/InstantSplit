import apiClient from "../axiosInstance.js";

import API_HEADERS from "../../../../shared/constants/api/apiHeaderConstants.js";
import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, CURRENCY } = API_ROUTES.GROUPS;
const { GROUPCODE } = API_HEADERS;

const fetchGroupCurrency = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${CURRENCY}`, {
      headers: {
        [GROUPCODE]: groupCode,
      },
    });

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group currency",
      { error: error.message },
      LOG_ERROR,
    );
    throw error;
  }
};

export default fetchGroupCurrency;
