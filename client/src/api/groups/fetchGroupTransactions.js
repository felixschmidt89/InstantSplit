import axios from "axios";

import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { GROUPS, GROUP_TRANSACTIONS } = ENDPOINTS;

export const fetchGroupTransactions = async (groupCode) => {
  debugLog("Fetching group transactions", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${GROUPS}/${groupCode}/${GROUP_TRANSACTIONS}`,
    );

    debugLog("Transaction data received", { count: data?.length }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching group transactions",
      { error: error.message, groupCode },
      LOG_ERROR,
    );

    throw error;
  }
};
