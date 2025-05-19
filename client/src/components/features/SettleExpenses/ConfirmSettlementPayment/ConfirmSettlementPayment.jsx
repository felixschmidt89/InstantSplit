// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { setViewStateInLocalStorage } from "../../../../utils/localStorageUtils";

// Hooks
import useConfirmationModalLogicAndActions from "../../../../hooks/useConfirmationModalLogicAndActions";

// Components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./ConfirmSettlementPayment.module.css";
import emojiConstants from "../../../../constants/emojiConstants";
import Emoji from "../../../common/Emoji/Emoji";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering an icon to confirm a settlement payment on click.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.paymentAmount - The amount of the payment.
 * @param {string} props.paymentMakerName - The name of the payment maker.
 * @param {string} props.paymentRecipientName - The name of the payment recipient.
 * @param {string} props.groupCode - The group code.
 * @param {Object[]} props.settlementPaymentSuggestions - Array of all settlement suggestions.
 * @returns {JSX.Element} React component.
 */
const ConfirmSettlementPayment = ({
  fixedDebitorCreditorOrder,
  paymentAmount,
  paymentMakerName,
  paymentRecipientName,
  groupCode,
  groupCurrency,
  settlementPaymentSuggestions,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  devLog("fixedDebitorCreditorOrder:", fixedDebitorCreditorOrder);
  devLog("API URL:", apiUrl);

  // Get confirmation modal logic from hook, pass callbacks to be executed on confirmation
  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions(() => confirmSettlementPayment());

  const confirmSettlementPayment = async () => {
    setError(null);
    try {
      // If fixedDebitorCreditorOrder is false, persist all settlements and delete the confirmed one
      if (!fixedDebitorCreditorOrder) {
        // Clean settlement suggestions to include only required fields and groupCode
        const cleanedSettlements = settlementPaymentSuggestions.map(
          ({ from, to, amount }) => ({
            from,
            to,
            amount: Number(amount), // Convert amount to number
            groupCode,
          })
        );
        devLog("Cleaned settlement suggestions payload:", cleanedSettlements);

        // Validate settlements before sending
        if (
          !cleanedSettlements.length ||
          !cleanedSettlements.every(
            (s) => s.from && s.to && s.amount != null && s.groupCode
          )
        ) {
          throw new Error("Invalid settlement data");
        }

        // Persist all settlement suggestions
        const persistResponse = await axios.post(`${apiUrl}/settlements`, {
          settlements: cleanedSettlements,
        });
        devLog("Settlement suggestions persisted:", persistResponse.data);

        // Delete the confirmed settlement
        const deleteResponse = await axios.delete(`${apiUrl}/settlements`, {
          data: {
            from: paymentMakerName,
            to: paymentRecipientName,
            amount: Number(paymentAmount), // Convert amount to number
            groupCode,
          },
        });
        devLog("Confirmed settlement deleted:", deleteResponse.data);
      }

      // Post the payment (existing behavior)
      const response = await axios.post(`${apiUrl}/payments`, {
        paymentMakerName,
        groupCode,
        paymentAmount: Number(paymentAmount), // Convert amount to number
        paymentRecipientName,
      });
      devLog("Settlement payment created:", response.data);

      setViewStateInLocalStorage("view2");
      navigate("/instant-split");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("generic-error-message");
      setError(errorMessage);
      devLog(
        "Error in settlement payment process:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={styles.container} onClick={handleShowConfirmation}>
      <div className={styles.confirm}>
        <Emoji
          ariaLabel={"payment emoji"}
          emoji={emojiConstants.payment}
          shrinkOnSmallDevices={true}
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
          isVisible={isConfirmationVisible}
          error={error}
        />
      )}
    </div>
  );
};

export default ConfirmSettlementPayment;
