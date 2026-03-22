import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Button } from "@mui/material";
import { IoArrowDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./CreatePayment.module.css";
import { useGroupContext } from "../../../context/GroupContext";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import API_URL from "../../../constants/apiConstants";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import TO from "../../../constants/clientRouteLinks";
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import RenderReactIcon from "../../RenderReactIcon/RenderReactIcon";
import Emoji from "../../Emoji/Emoji.jsx";
import emojiConstants from "../../../constants/emojiConstants";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import STYLES from "../../../constants/stylesConstants";

const { INSTANT_SPLIT } = TO;
const { buttonStyles } = STYLES;

const CreatePayment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useGlobalError();
  const { activeGroupCode, groupMembers } = useGroupContext();

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMakerName, setPaymentMakerName] = useState("");
  const [paymentRecipientName, setPaymentRecipientName] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/payments`, {
        paymentMakerName,
        groupCode: activeGroupCode,
        paymentAmount,
        paymentRecipientName,
      });

      devLog("Payment created:", response);
      navigate(INSTANT_SPLIT);
    } catch (apiError) {
      if (apiError?.response) {
        handleApiErrors(apiError, setError, "payments", showError, t);
      } else {
        const genericMessage = t("generic-error-message");
        setError(genericMessage);
        devLog("Error creating payment:", apiError);
        showError(genericMessage);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <PaymentAmountInput
        paymentAmount={paymentAmount}
        onAmountChange={setPaymentAmount}
      />

      <PaymentMakerSelect
        paymentMakerName={paymentMakerName}
        onPaymentMakerChange={setPaymentMakerName}
        groupMembers={groupMembers}
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
      />

      <div>
        <Button style={buttonStyles} variant='contained' type='submit'>
          {t("create-payment-button-text")}
        </Button>
      </div>
    </form>
  );
};

export default CreatePayment;
