import apiClient from "../axiosInstance.js";

import { API_HEADERS } from "../../../../shared/constants/api/apiHeaderConstants.js";
import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { BASE, CURRENCY } = API_ROUTES.GROUPS;
const { GROUPCODE } = API_HEADERS;

export const fetchGroupCurrency = async (groupCode) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${CURRENCY}`, {
      headers: {
        [GROUPCODE]: groupCode,
      },
    });

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group currency",
      { error: error.message },
      debugLog.ERROR,
    );
    throw error;
  }
};
