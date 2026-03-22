import { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { currenciesContent } from "../../../contents/currenciesContent";

import styles from "./ChangeGroupCurrency.module.css";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import { findCurrencyLabel } from "../../../utils/currencyUtils";
import useEditPenVisibility from "../../../hooks/useEditPenVisibility";
import { API_URL } from "../../../constants/apiConstants";
import { devLog } from "../../../utils/errorUtils";

import FormSubmitButton from "../../FormSubmitButton/FormSubmitButton";
import STYLES from "../../../constants/stylesConstants";
import EditPenButton from "../../EditPenButton/EditPenButton";
import { submitOnEnter } from "../../../utils/form/submitOnEnter.js";

const { sendFormSubmitButtonStyles } = STYLES;

const ChangeGroupCurrency = ({ groupCurrency, groupCode }) => {
  const selectRef = useRef(null);
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { showError } = useGlobalError();

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
    if (e) e.preventDefault();
    setError(null);

    try {
      const response = await axios.patch(
        `${API_URL}/groups/currency/${groupCode}`,
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
    } catch (apiError) {
      const errorMessage = t("generic-error-message");
      setError(errorMessage);
      showError(errorMessage);
      devLog("Error updating group currency:", apiError);
    }
  };

  const handleKeyDown = (event) => {
    submitOnEnter(event, handleFormSubmit);
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
    </div>
  );
};

export default ChangeGroupCurrency;
