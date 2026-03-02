import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import styles from "./ConfirmSettlementPayment.module.css";
import { useGroupContext } from "../../../context/GroupContext";
import useConfirmationModalLogicAndActions from "../../../hooks/useConfirmationModalLogicAndActions";

import { devLog } from "../../../utils/errorUtils";
import { setStoredView } from "../../../utils/localStorage";
import { API_URL } from "../../../constants/apiConstants";
import { VIEW_TYPES } from "../../../constants/viewConstants";
import { TO } from "../../../constants/navigationConstants";
import emojiConstants from "../../../constants/emojiConstants";

import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import Emoji from "../../Emoji/Emoji";
import { useNavigate } from "react-router-dom";

const { INSTANT_SPLIT } = TO;

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

  devLog("fixedDebitorCreditorOrder:", fixedDebitorCreditorOrder);
  devLog("API URL:", API_URL);

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
        devLog("Settlement suggestions persisted:", persistResponse.data);
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
      devLog("Settlement payment created:", response.data);

      setStoredView(VIEW_TYPES.BALANCES);
      navigate(INSTANT_SPLIT);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("generic-error-message");
      setError(errorMessage);
      devLog("Error in settlement payment process:", error.message);
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
