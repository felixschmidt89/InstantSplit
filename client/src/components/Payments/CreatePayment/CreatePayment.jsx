import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Button } from "@mui/material";
import { IoArrowDownOutline } from "react-icons/io5";

import styles from "./CreatePayment.module.css";
import { useGroupContext } from "../../../context/GroupContext";
import useAppNavigate from "../../../hooks/useAppNavigate";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { API_URL } from "../../../constants/apiConstants";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import { TO } from "../../../constants/navigationConstants";
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import RenderReactIcon from "../../RenderReactIcon/RenderReactIcon";
import Emoji from "../../Emoji/Emoji";
import emojiConstants from "../../../constants/emojiConstants";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import { buttonStyles } from "../../../constants/stylesConstants";
import ErrorModal from "../../ErrorModal/ErrorModal";

const { INSTANT_SPLIT } = TO;

const CreatePayment = () => {
  const navigate = useAppNavigate();
  const { t } = useTranslation();
  const { activeGroupCode, groupMembers } = useGroupContext();

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

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
    } catch (error) {
      if (error?.response) {
        handleApiErrors(error, setError, "payments", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog("Error creating payment:", error);
        displayErrorModal();
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

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreatePayment;
