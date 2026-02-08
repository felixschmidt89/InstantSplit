import apiClient from "../axiosInstance.js";
import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.USERS;

export const deleteGroupMember = async (userId) => {
  try {
    const response = await apiClient.delete(`/${BASE}/${userId}`);

    return response;
  } catch (error) {
    debugLog(
      "Error deleting group member",
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};
