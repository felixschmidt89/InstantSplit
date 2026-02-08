import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.GROUPS;

export const fetchGroupData = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${groupCode}`);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group data",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
