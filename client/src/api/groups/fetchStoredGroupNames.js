import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, STORED_GROUP_NAMES } = API_ROUTES.GROUPS;

export const fetchStoredGroupNames = async (groupCodesArray) => {
  try {
    const groupCodesString = groupCodesArray.join(",");

    const { data } = await apiClient.get(`/${BASE}/${STORED_GROUP_NAMES}`, {
      params: { storedGroupCodes: groupCodesString },
    });

    return data;
  } catch (error) {
    debugLog(
      "Error fetching stored group names",
      { error: error.message },
      LOG_ERROR,
    );
    throw error;
  }
};
