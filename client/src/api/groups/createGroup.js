import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.GROUPS;

export const createGroup = async (groupName) => {
  try {
    const { data } = await apiClient.post(`/${BASE}`, {
      groupName,
    });

    return data;
  } catch (error) {
    debugLog(
      "Failed to create group",
      { error: error.message, groupName },
      LOG_ERROR,
    );

    throw error;
  }
};
