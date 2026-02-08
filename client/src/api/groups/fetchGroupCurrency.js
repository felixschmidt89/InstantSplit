import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, CURRENCY } = API_ROUTES.GROUPS;

export const fetchGroupCurrency = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${CURRENCY}/${groupCode}`);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group currency",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
