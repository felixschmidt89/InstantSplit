import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.PAYMENTS;

export const fetchPayment = async (paymentId) => {
  try {
    const { data } = await apiClient.get(`/${BASE}/${paymentId}`);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching payment info",
      { error: error.message, paymentId },
      LOG_ERROR,
    );
    throw error;
  }
};
