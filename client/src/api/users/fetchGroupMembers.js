import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { USERS, USERS_BY_GROUP_CODE } = ENDPOINTS;

export const fetchGroupMembers = async (groupCode) => {
  debugLog("Fetching group members", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}${USERS}/${USERS_BY_GROUP_CODE}/${groupCode}`,
    );

    debugLog("Group members fetched", { count: data?.users?.length }, INFO);

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
