import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, HAS_PERSISTED_ORDER } = API_ROUTES.GROUPS;

export const fetchHasPersistedSettlements = async (groupCode) => {
  try {
    const { data } = await apiClient.get(
      `/${BASE}/${groupCode}/${HAS_PERSISTED_ORDER}`,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error checking persisted settlements status",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
