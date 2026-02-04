import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { PAYMENTS } = ENDPOINTS;

export const fetchPayment = async (paymentId) => {
  debugLog("Fetching payment info", { paymentId }, INFO);

  try {
    const { data } = await axios.get(`${API_URL}/${PAYMENTS}/${paymentId}`);

    debugLog("Payment info fetched", { payment: data?.payment }, INFO);

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
