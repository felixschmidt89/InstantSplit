import { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { currenciesContent } from "../../../contents/currenciesContent";

import { devLog } from "@utils/errorUtils";
import { sendFormSubmitButtonStyles } from "@constants/stylesConstants";
import { submitOnEnterClick } from "@utils/formUtils";
import { findCurrencyLabel } from "@utils/currencyUtils";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";
import useEditPenVisibility from "@hooks/useEditPenVisibility";

import FormSubmitButton from "@components/FormSubmitButton/FormSubmitButton";
import ErrorModal from "@components/ErrorModal/ErrorModal";
import EditPenButton from "@components/EditPenButton/EditPenButton";

import styles from "./ChangeGroupCurrency.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangeGroupCurrency = ({ groupCurrency, groupCode }) => {
  const selectRef = useRef(null);
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [currency, setCurrency] = useState({
    selectedCurrency: groupCurrency,
    storedCurrency: groupCurrency,
  });
  const [error, setError] = useState(null);

  const storedCurrencyLabel = findCurrencyLabel(currency.storedCurrency);

  const { showEdit, handleIconClick, handleChange } = useEditPenVisibility(
    containerRef,
    setCurrency,
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.patch(
        `${apiUrl}/groups/currency/${groupCode}`,
        {
          groupCode,
          currency: currency.selectedCurrency,
        },
      );

      handleChange((prevState) => ({
        ...prevState,
        storedCurrency: currency.selectedCurrency,
      }));
      devLog("Group currency updated:", response);
    } catch (error) {
      setError(t("generic-error-message"));
      displayErrorModal();
      devLog("Error updating group currency:", error);
    }
  };

  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.header}>
        {t("change-group-currency-setting-header")}
      </h2>

      {showEdit ? (
        <div className={styles.editContainer}>
          <form onSubmit={handleFormSubmit}>
            <select
              className={styles.select}
              value={currency.selectedCurrency || ""}
              onChange={(event) =>
                setCurrency((prevState) => ({
                  ...prevState,
                  selectedCurrency: event.target.value,
                }))
              }
              onKeyDown={handleKeyDown}>
              {currenciesContent.map((currency) => (
                <option
                  key={currency.value}
                  value={currency.value}
                  ref={selectRef}>
                  ({currency.value}) {currency.label}
                </option>
              ))}
            </select>

            <FormSubmitButton {...sendFormSubmitButtonStyles} />
          </form>
        </div>
      ) : (
        <div className={styles.currencyContainer}>
          <span className={styles.currencyName}>{storedCurrencyLabel}</span>
          <span className={styles.icon}>
            <EditPenButton handleIconClick={handleIconClick} scale={1.4} />
          </span>
        </div>
      )}

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeGroupCurrency;
