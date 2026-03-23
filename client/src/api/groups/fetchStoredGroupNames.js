import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, STORED_GROUP_NAMES } = API_ROUTES.GROUPS;

// TODO: Refactor and hide group codes so that they are not exposed in the API endpoint
const fetchStoredGroupNames = async (groupCodesArray) => {
  try {
    const groupCodesString = groupCodesArray.join(",");

    const { data } = await apiClient.get(`/${BASE}/${STORED_GROUP_NAMES}`, {
      params: { storedGroupCodes: groupCodesString },
    });

    return data;
  } catch (error) {
    debugLog(
      "Error fetching stored group names",
      { error: error.message },
      LOG_ERROR,
    );
    throw error;
  }
};

export default fetchStoredGroupNames;
