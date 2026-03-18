import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";
import apiClient from "../axiosInstance.js";

const { ERROR } = LOG_LEVELS;

export const updateResource = async (resourceType, resourceId, payload) => {
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
      ERROR,
    );
    throw error;
  }
};
