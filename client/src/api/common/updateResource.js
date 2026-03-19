import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import apiClient from "../axiosInstance.js";

const { LOG_ERROR } = LOG_LEVELS;

const updateResource = async (resourceType, resourceId, payload) => {
  try {
    const response = await apiClient.patch(
      `/${resourceType}/${resourceId}`,
      payload,
    );
    return response;
  } catch (error) {
    debugLog(
      `Error updating ${resourceType}`,
      { error: error.message, resourceId, payload },
      LOG_ERROR,
    );
    throw error;
  }
};

export default updateResource;
