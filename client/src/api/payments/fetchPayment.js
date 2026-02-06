import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE } = API_ROUTES.PAYMENTS;

export const fetchPayment = async (paymentId) => {
  debugLog("Fetching payment info", { paymentId }, INFO);

  try {
    const { data } = await axios.get(`${API_URL}/${BASE}/${paymentId}`);

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
