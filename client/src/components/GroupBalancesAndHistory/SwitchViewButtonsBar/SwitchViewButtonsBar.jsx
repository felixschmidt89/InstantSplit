import { useTranslation } from "react-i18next";
import SwitchViewButton from "../SwitchViewButton/SwitchViewButton";
import styles from "./SwitchViewButtonsBar.module.css";

import VIEWS from "../../../constants/viewConstants";

const SwitchViewButtonsBar = ({ view, updateView }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.buttonContainer}>
      <SwitchViewButton
        text={t("view-switch-balances-button")}
        isActive={view === VIEWS.BALANCES}
        onClick={() => updateView(VIEWS.BALANCES)}
      />

      <SwitchViewButton
        text={t("view-switch-history-button")}
        isActive={view === VIEWS.HISTORY}
        onClick={() => updateView(VIEWS.HISTORY)}
      />
    </div>
  );
};

export default SwitchViewButtonsBar;
