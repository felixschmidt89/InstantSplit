import React from "react";
import { useTranslation } from "react-i18next";

import SwitchViewButton from "../SwitchViewButton/SwitchViewButton";

import styles from "./SwitchViewButtonsBar.module.css";
import {
  BALANCE_VIEWS,
  HISTORY_VIEWS,
  VIEW_TYPES,
} from "../../../constants/viewConstants";

const SwitchViewButtonsBar = ({ view, updateView }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.buttonContainer}>
      <SwitchViewButton
        text={t("view-switch-balances-button")}
        isActive={BALANCE_VIEWS.includes(view)}
        onClick={() => updateView(VIEW_TYPES.BALANCES)}
      />

      <SwitchViewButton
        text={t("view-switch-history-button")}
        isActive={HISTORY_VIEWS.includes(view)}
        onClick={() => updateView(VIEW_TYPES.HISTORY)}
      />
    </div>
  );
};

export default SwitchViewButtonsBar;
