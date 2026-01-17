import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { IoArrowDownOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { devLog, handleApiErrors } from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";
import { buttonStyles } from "../../../../constants/stylesConstants";
import {
  changeFixedDebitorCreditorOrderSetting,
  deleteAllSettlementsForGroup,
} from "../../../../utils/settlementUtils";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import Emoji from "../../../common/Emoji/Emoji";
import RenderReactIcon from "../../../common/RenderReactIcon/RenderReactIcon";
import { ROUTES } from "../../../../constants/routesConstants";
import styles from "./CreatePayment.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreatePayment = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paymentAmount, setPaymentAmount] = useState(null);
  const [paymentMakerName, setPaymentMakerName] = useState(null);
  const [paymentRecipientName, setPaymentRecipientName] = useState(null);
  const [error, setError] = useState(null);

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/payments`, {
        paymentMakerName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });

      devLog("Payment created:", response);
      changeFixedDebitorCreditorOrderSetting(groupCode, false);
      deleteAllSettlementsForGroup(groupCode);

      navigate(ROUTES.INSTANT_SPLIT);
    } catch (error) {
      if (error.response) {
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
