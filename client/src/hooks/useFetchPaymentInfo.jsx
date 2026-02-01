import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { debugLog } from "../../../shared/utils/debug";
import { API_URL } from "../constants/apiConstants";

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
        debugLog("Payment info fetched:", response);
        setPaymentInfo(paymentData);
        setIsFetched(true);
      } catch (error) {
        debugLog("Error fetching payment info:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchPaymentInfo();
  }, [paymentId, t]);

  return { paymentInfo, isFetched, error };
};

export default useFetchPaymentInfo;
