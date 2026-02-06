import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, CURRENCY } = API_ROUTES.GROUPS;

export const fetchGroupCurrency = async (groupCode) => {
  debugLog("Fetching group currency", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${BASE}/${CURRENCY}/${groupCode}`,
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
