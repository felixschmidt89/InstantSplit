import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { GROUPS, GROUP_CURRENCY } = ENDPOINTS;

export const fetchGroupCurrency = async (groupCode) => {
  debugLog("Fetching group currency", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${GROUPS}/${GROUP_CURRENCY}/${groupCode}`,
    );

    debugLog("Group currency fetched", { currency: data?.currency }, INFO);

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
