import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, BY_GROUP_CODE } = API_ROUTES.USERS;

export const fetchGroupMembers = async (groupCode) => {
  debugLog("Fetching group members", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${BASE}/${BY_GROUP_CODE}/${groupCode}`,
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
