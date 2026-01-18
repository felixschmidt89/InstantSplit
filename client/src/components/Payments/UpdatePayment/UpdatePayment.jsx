import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IoArrowDownOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { devLog, handleApiErrors } from "@utils/errorUtils";
import emojiConstants from "@constants/emojiConstants";
import { MINIMUM_VALID_AMOUNT } from "@constants/dataConstants";
import { buttonStyles } from "@constants/stylesConstants";
import { ROUTES } from "@constants/routesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import PaymentAmountInput from "@components/Payments/PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "@components/Payments/PaymentMakerSelect/PaymentMakerSelect";
import PaymentRecipientSelect from "@components/Payments/PaymentRecipientSelect/PaymentRecipientSelect";
import ErrorModal from "@components/ErrorModal/ErrorModal";
import Emoji from "@components/Emoji/Emoji";
import RenderReactIcon from "@components/RenderReactIcon/RenderReactIcon";

import styles from "./UpdatePayment.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UpdatePayment = ({
  groupMembers,
  groupCode,
  paymentDetails,
  route = ROUTES.INSTANT_SPLIT,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const {
    _id: paymentId,
    paymentAmount: storedPaymentAmount,
    paymentMaker: { userName: storedPaymentMakerName },
    paymentRecipient: { userName: storedPaymentRecipientName },
  } = paymentDetails;

  const [paymentAmount, setPaymentAmount] = useState(storedPaymentAmount);
  const [paymentMakerName, setPaymentMakerName] = useState(
    storedPaymentMakerName,
  );
  const [paymentRecipientName, setPaymentRecipientName] = useState(
    storedPaymentRecipientName,
  );
  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState(null);

  const isSubmitButtonVisible =
    formChanged &&
    paymentAmount >= MINIMUM_VALID_AMOUNT &&
    paymentMakerName &&
    paymentRecipientName;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`${apiUrl}/payments/${paymentId}`, {
        groupCode,
        paymentAmount,
        paymentMakerName,
        paymentRecipientName,
        storedPaymentMakerName,
        storedPaymentRecipientName,
      });

      devLog("Payment updated:", response);
      navigate(route);
    } catch (error) {
      if (error.response) {
        handleApiErrors(error, setError, "payments", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error updating payment:", error);
        displayErrorModal();
      }
    }
  };

  useEffect(() => {
    const hasChanged =
      paymentAmount !== storedPaymentAmount ||
      paymentMakerName !== storedPaymentMakerName ||
      paymentRecipientName !== storedPaymentRecipientName;

    setFormChanged(hasChanged);
  }, [
    paymentAmount,
    paymentMakerName,
    paymentRecipientName,
    storedPaymentAmount,
    storedPaymentMakerName,
    storedPaymentRecipientName,
  ]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <PaymentAmountInput
        paymentAmount={paymentAmount}
        onAmountChange={setPaymentAmount}
        isUpdate
      />

      <PaymentMakerSelect
        paymentMakerName={paymentMakerName}
        onPaymentMakerChange={setPaymentMakerName}
        groupMembers={groupMembers}
        isUpdate
      />

      <div className={styles.emojis}>
        <Emoji ariaLabel='payment emoji' emoji={emojiConstants.payment} />
        <RenderReactIcon
          icon={IoArrowDownOutline}
          size={1.6}
          scale={1.4}
          translateX={0.1}
          translateY={0.25}
        />
      </div>

      <PaymentRecipientSelect
        paymentRecipientName={paymentRecipientName}
        onRecipientChange={setPaymentRecipientName}
        groupMembers={groupMembers}
        isUpdate
      />

      <div className={styles.buttonContainer}>
        {isSubmitButtonVisible && (
          <Button style={buttonStyles} variant='contained' type='submit'>
            {t("update-payment-button-text")}
          </Button>
        )}

        <ErrorModal
          error={error}
          onClose={handleCloseErrorModal}
          isVisible={isErrorModalVisible}
        />
      </div>
    </form>
  );
};

export default UpdatePayment;
