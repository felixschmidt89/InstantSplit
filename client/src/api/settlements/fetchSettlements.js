import apiClient from "../axiosInstance";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.SETTLEMENTS;

export const fetchSettlements = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${groupCode}`);
    return data;
  } catch (error) {
    debugLog(
      "Error fetching settlements",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
