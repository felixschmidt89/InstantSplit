import apiClient from "../axiosInstance.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;

const requestUpdateResource = async (resourceType, resourceId, payload) => {
  try {
    const response = await apiClient.patch(
      `/${resourceType}/${resourceId}`,
      payload,
    );
    return response;
  } catch (apiError) {
    debugLog(
      `Error updating ${resourceType}`,
      { error: apiError.message, resourceId, payload },
      LOG_ERROR,
    );
    throw apiError;
  }
};

export default requestUpdateResource;
