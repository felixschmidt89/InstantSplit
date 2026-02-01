import axios from "axios";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

import { DEBUG_MESSAGES } from "../../../../shared/constants/debugConstants.js";
import {
  LOG_LEVELS,
  LOG_SOURCES,
} from "@instant-split/shared/constants/debugConstants.js";

export const fetchGroupTransactions = async (groupCode) => {
  debugLog(
    DEBUG_MESSAGES.API.FETCHING,
    { groupCode },
    LOG_LEVELS.INFO,
    LOG_SOURCES.CLIENT,
  );

  try {
    const { data } = await axios.get(
      `${API_URL}${ENDPOINTS.GROUPS}/${groupCode}/${ENDPOINTS.GROUP_TRANSACTIONS}`,
    );

    debugLog(
      DEBUG_MESSAGES.API.DATA_RECEIVED,
      { data },
      LOG_LEVELS.SUCCESS,
      LOG_SOURCES.CLIENT,
    );

    return data;
  } catch (error) {
    debugLog(
      DEBUG_MESSAGES.API.ERROR,
      { error: error.message, groupCode },
      LOG_LEVELS.ERROR,
      LOG_SOURCES.CLIENT,
    );
    throw error;
  }
};
