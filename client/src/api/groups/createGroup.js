import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, SUCCESS, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.GROUPS;

export const createGroup = async (groupName) => {
  debugLog("Attempting to create group", { groupName }, INFO);

  try {
    const { data } = await axios.post(`${API_URL}/${BASE}`, {
      groupName,
    });

    debugLog(
      "Group created successfully",
      { groupId: data?.group?._id },
      SUCCESS,
    );

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
