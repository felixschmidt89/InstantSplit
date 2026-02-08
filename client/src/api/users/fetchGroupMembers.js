import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, BY_GROUP_CODE } = API_ROUTES.USERS;

export const fetchGroupMembers = async (groupCode) => {
  try {
    const { data } = await apiClient.get(
      `/${BASE}/${BY_GROUP_CODE}/${groupCode}`,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group members",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
