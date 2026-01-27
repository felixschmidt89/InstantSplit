// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

import { API_URL } from "@client-constants/apiConstants";

/**
 * Custom hook for fetching payment information.
 *
 * @param {string} paymentId - The ID of the payment to fetch.
 * @returns {Object} An object containing payment information and potential error.
 * @property {Object|null} paymentInfo - The fetched payment information.
 *  @property {boolean} isFetched - Indicates whether the payment info has been successfully fetched.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchPaymentInfo = (paymentId) => {
  const { t } = useTranslation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/payments/${paymentId}`);
        const paymentData = response.data.payment;
        devLog("Payment info fetched:", response);
        setPaymentInfo(paymentData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching payment info:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchPaymentInfo();
  }, [paymentId, t]);

  return { paymentInfo, isFetched, error };
};

export default useFetchPaymentInfo;
