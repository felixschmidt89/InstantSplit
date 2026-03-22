import apiClient from "../axiosInstance.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;

const requestDeleteResource = async (resourceType, resourceId) => {
  try {
    const response = await apiClient.delete(`/${resourceType}/${resourceId}`);
    return response;
  } catch (apiError) {
    debugLog(
      `Error deleting ${resourceType}`,
      { error: apiError.message, resourceId },
      LOG_ERROR,
    );
    throw apiError;
  }
};

export default requestDeleteResource;
