import apiClient from "../axiosInstance";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, PERSISTED_ORDER } = API_ROUTES.GROUPS;

export const updateHasPersistedSettlements = async (
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
