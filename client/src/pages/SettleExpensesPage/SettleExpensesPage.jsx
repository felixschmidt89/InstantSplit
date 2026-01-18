// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import SettleExpenses from "../../components/features/SettleExpenses/SettleExpenses/SettleExpenses";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./SettleExpensesPage.module.css";

function SettleExpensesPage() {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("settle-expenses-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"settle-expenses"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("settle-expenses-page-header")}</h1>
        <SettleExpenses />
      </div>
    </main>
  );
}

export default SettleExpensesPage;
