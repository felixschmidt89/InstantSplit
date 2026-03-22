import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./ConfirmSettlementPayment.module.css";
import { useGroupContext } from "../../../context/GroupContext.jsx";
import useConfirmationModalLogicAndActions from "../../../hooks/useConfirmationModalLogicAndActions.jsx";
import setStoredViewInLocalStorage from "../../../utils/localStorage/setStoredViewInLocalStorage.js";
import API_URL from "../../../constants/apiConstants.js";
import CLIENT_STATIC_ROUTES from "../../../constants/clientStaticRoutesConstants.js";
import debugLog from "../../../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../../../shared/constants/system/loggerConstants.js";
import emojiConstants from "../../../constants/emojiConstants.jsx";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal.jsx";
import Emoji from "../../Emoji/Emoji.jsx";
import VIEWS from "../../../constants/viewConstants.js";

const { INSTANT_SPLIT } = CLIENT_STATIC_ROUTES;
const { DEBUG, ERROR } = LOG_LEVELS;

const ConfirmSettlementPayment = ({
  fixedDebitorCreditorOrder,
  paymentAmount,
  paymentMakerName,
  paymentRecipientName,
  groupCurrency,
  settlementPaymentSuggestions,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeGroupCode } = useGroupContext();
  const [error, setError] = useState(null);

  debugLog("fixedDebitorCreditorOrder:", fixedDebitorCreditorOrder, DEBUG);

  const handleSettlementPaymentConfirmation = async () => {
    setError(null);
    try {
      if (!fixedDebitorCreditorOrder) {
        const cleanedSettlements = settlementPaymentSuggestions.map(
          ({ from, to, amount }) => ({
            from,
            to,
            amount: Number(amount),
            groupCode: activeGroupCode,
          }),
        );

        const hasNoSettlements = !cleanedSettlements?.length;

        const hasInvalidSettlementDetails = !cleanedSettlements.every(
          (settlement) => {
            const hasSender = Boolean(settlement.from);
            const hasRecipient = Boolean(settlement.to);
            const hasValidAmount = Number.isFinite(settlement.amount);

            return hasSender && hasRecipient && hasValidAmount;
          },
        );

        if (hasNoSettlements || hasInvalidSettlementDetails) {
          throw new Error("Invalid settlement data");
        }

        const persistResponse = await axios.post(`${API_URL}/settlements`, {
          settlements: cleanedSettlements,
        });

        debugLog(
          "Settlement suggestions persisted:",
          persistResponse.data,
          DEBUG,
        );
      }

      await axios.delete(`${API_URL}/settlements`, {
        data: {
          from: paymentMakerName,
          to: paymentRecipientName,
          amount: Number(paymentAmount),
          groupCode: activeGroupCode,
        },
      });

      const response = await axios.post(`${API_URL}/payments`, {
        paymentMakerName,
        groupCode: activeGroupCode,
        paymentAmount: Number(paymentAmount),
        paymentRecipientName,
      });

      debugLog("Settlement payment created:", response.data, DEBUG);

      setStoredViewInLocalStorage(VIEWS.BALANCES);
      navigate(INSTANT_SPLIT);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("generic-error-message");
      setError(errorMessage);

      debugLog("Error in settlement payment process:", error.message, ERROR);
    }
  };

  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions(() =>
    handleSettlementPaymentConfirmation(),
  );

  return (
    <div className={styles.container} onClick={handleShowConfirmation}>
      <div className={styles.confirm}>
        <Emoji
          ariaLabel='payment emoji'
          emoji={emojiConstants.payment}
          shrinkOnSmallDevices
        />
        <span className={styles.confirmText}>
          {t("confirm-settlement-payment-button")}
        </span>
      </div>
      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("confirm-settlement-payment-message", {
            paymentMakerName,
            paymentAmount,
            groupCurrency,
            paymentRecipientName,
          })}
          onConfirm={handleConfirmation}
          onCancel={handleHideConfirmation}
          isVisible
          error={error && t(error)}
        />
      )}
    </div>
  );
};

export default ConfirmSettlementPayment;
