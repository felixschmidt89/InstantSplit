import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.GROUPS;

const fetchGroupData = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${groupCode}`);

    return data;
  } catch (apiError) {
    debugLog(
      "Error fetching group data",
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

export default fetchGroupData;
