import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, SUCCESS, LOG_ERROR } = LOG_LEVELS;
const { GROUPS } = ENDPOINTS;

export const createGroup = async (groupName) => {
  debugLog("Attempting to create group", { groupName }, INFO);

  try {
    const { data } = await axios.post(`${API_URL}/${GROUPS}`, {
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
