// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import SwitchViewButton from "../../GroupBalancesAndHistory/SwitchViewButton/SwitchViewButton";

// Styles
import styles from "./GroupBalanceAndHistoryExplanation.module.css";

/**
 * Component for rendering an explanation of a group's balances and history views.
 */
const GroupBalanceAndHistoryExplanation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.elaboration}>
        {/* Render unclickable balance button*/}
        <div className={styles.button}>
          <SwitchViewButton
            text={t("group-balance-and-history-explanation-balances-button")}
            isActive={"view2"}
          />
        </div>
        <ul className={styles.list}>
          <li>
            {t("group-balance-and-history-explanation-balances-list-item1")}
          </li>
          <li>
            {t("group-balance-and-history-explanation-balances-list-item2")}
          </li>
        </ul>
        {/* Render unclickable history button*/}
        <div className={styles.button}>
          <SwitchViewButton
            text={t("group-balance-and-history-explanation-history-button")}
            isActive={"view1"}
          />{" "}
        </div>
        <ul className={styles.list}>
          <li>
            {t("group-balance-and-history-explanation-history-list-item1")}
          </li>
          <li>
            {t("group-balance-and-history-explanation-history-list-item2")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupBalanceAndHistoryExplanation;
