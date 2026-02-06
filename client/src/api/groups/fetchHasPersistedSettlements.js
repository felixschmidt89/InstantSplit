import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, HAS_PERSISTED_ORDER } = API_ROUTES.GROUPS;

export const fetchHasPersistedSettlements = async (groupCode) => {
  debugLog("Checking if group has persisted settlements", { groupCode }, INFO);

  try {
    const { data } = await axios.get(
      `${API_URL}/${BASE}/${groupCode}/${HAS_PERSISTED_ORDER}`,
    );

    debugLog(
      "Persisted settlements check complete",
      { hasPersistedSettlements: data },
      INFO,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error checking persisted settlements status",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
