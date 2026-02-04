import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";
import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { GROUPS } = ENDPOINTS;
const { HAS_PERSISTED_ORDER } = API_ROUTES.GROUPS;

export const fetchPersistedDebitorCreditorOrder = async (groupCode) => {
  debugLog("Fetching persisted order status", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${GROUPS}/${groupCode}/${HAS_PERSISTED_ORDER}`,
    );

    debugLog(
      "Persisted order status fetched",
      { hasPersistedOrder: data },
      INFO,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error fetching persisted order status",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
