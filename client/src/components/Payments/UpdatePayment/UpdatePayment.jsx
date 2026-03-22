import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { IoArrowDownOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./UpdatePayment.module.css";
import { TO } from "../../../constants/clientRouteLinks";
import { useGroupContext } from "../../../context/GroupContext";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import { MINIMUM_VALID_AMOUNT } from "../../../constants/dataConstants";
import { API_URL } from "../../../constants/apiConstants";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import emojiConstants from "../../../constants/emojiConstants";
import Emoji from "../../Emoji/Emoji.jsx";
import RenderReactIcon from "../../RenderReactIcon/RenderReactIcon";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import STYLES from "../../../constants/stylesConstants";

const { INSTANT_SPLIT } = TO;
const { buttonStyles } = STYLES;

const UpdatePayment = ({ paymentDetails, navigateTo = INSTANT_SPLIT }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useGlobalError();
  const { activeGroupCode, groupMembers } = useGroupContext();

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
      const response = await axios.put(`${API_URL}/payments/${paymentId}`, {
        groupCode: activeGroupCode,
        paymentAmount,
        paymentMakerName,
        paymentRecipientName,
        storedPaymentMakerName,
        storedPaymentRecipientName,
      });

      devLog("Payment updated:", response);
      navigate(navigateTo);
    } catch (apiError) {
      if (apiError.response) {
        handleApiErrors(apiError, setError, "payments", showError, t);
      } else {
        const genericMessage = t("generic-error-message");
        setError(genericMessage);
        devLog("Error updating payment:", apiError);
        showError(genericMessage);
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
      </div>
    </form>
  );
};

export default UpdatePayment;
