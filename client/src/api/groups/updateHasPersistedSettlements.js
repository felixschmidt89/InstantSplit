import apiClient from "../axiosInstance.js";

import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, PERSISTED_ORDER } = API_ROUTES.GROUPS;

const updateHasPersistedSettlements = async (
  groupCode,
  hasPersistedSettlements,
) => {
  try {
    const payload = {
      groupCode,
      fixedDebitorCreditorOrder: hasPersistedSettlements,
    };

    const { data } = await apiClient.patch(
      `/${BASE}/${PERSISTED_ORDER}/${groupCode}`,
      payload,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error updating 'has persisted settlements' status",
      { error: error.message, groupCode, hasPersistedSettlements },
      LOG_ERROR,
    );
    throw error;
  }
};

export default updateHasPersistedSettlements;
