import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.GROUPS;

export const fetchGroupData = async (groupCode) => {
  debugLog("Fetching group data", { groupCode }, INFO);

  try {
    const { data } = await axios.get(`${API_URL}/${BASE}/${groupCode}`);

    debugLog("Group data fetched", { group: data }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group data",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
