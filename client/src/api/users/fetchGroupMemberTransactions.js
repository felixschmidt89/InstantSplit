import apiClient from "../axiosInstance";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants";
import { debugLog } from "../../../../shared/utils/debug/debugLog";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE, TRANSACTIONS } = API_ROUTES.USERS;

export const fetchGroupMemberTransactions = async (userId) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${userId}/${TRANSACTIONS}`);
    return data;
  } catch (error) {
    debugLog(
      "Error fetching group member transactions",
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};
