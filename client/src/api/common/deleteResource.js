import apiClient from "../axiosInstance.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;

export const deleteResource = async (resourceType, resourceId) => {
  try {
    const response = await apiClient.delete(`/${resourceType}/${resourceId}`);
    return response;
  } catch (error) {
    debugLog(
      `Error deleting ${resourceType}`,
      { error: error.message, resourceId },
      LOG_ERROR,
    );
    throw error;
  }
};
