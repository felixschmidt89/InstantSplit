import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, HAS_PERSISTED_ORDER } = API_ROUTES.GROUPS;

export const fetchPersistedDebitorCreditorOrder = async (groupCode) => {
  debugLog("Fetching persisted order status", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${BASE}/${groupCode}/${HAS_PERSISTED_ORDER}`,
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
