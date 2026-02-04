import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { debugLog } from "../../../shared/utils/debug/debugLog.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";

import { fetchPayment } from "../api/payments/fetchPayment";

const useFetchPaymentInfo = (paymentId) => {
  const { t } = useTranslation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPayment = async () => {
      try {
        const { payment } = await fetchPayment(paymentId);
        setPaymentInfo(payment);
        setIsFetched(true);
      } catch (err) {
        debugLog(
          "Error in hook fetching payment info",
          { error: err.message },
          LOG_LEVELS.LOG_ERROR,
        );
        setError(t("generic-error-message"));
      }
    };

    if (paymentId) {
      getPayment();
    }
  }, [paymentId, t]);

  return { paymentInfo, isFetched, error };
};

export default useFetchPaymentInfo;
