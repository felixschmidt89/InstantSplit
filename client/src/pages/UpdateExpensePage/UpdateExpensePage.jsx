import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useExpenseUpdate from "../../hooks/useExpenseUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import Spinner from "../../components/Spinner/Spinner";
import UpdateExpense from "../../components/Expenses/UpdateExpense/UpdateExpense";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./UpdateExpensePage.module.css";

const UpdateExpensePage = () => {
  const { groupCode, expenseId } = useParams();
  const { t } = useTranslation();

  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  const { isLoading, expenseInfo, groupMembers } = useExpenseUpdate(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-expense-page-title")} />
      <PiratePx COUNT_IDENTIFIER='update-expense' />

      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute home />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute home />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className={styles.header}>{t("update-expense-page-header")}</h1>
          <div className={styles.container}>
            <UpdateExpense
              groupCode={groupCode}
              groupMembers={groupMembers}
              expenseId={expenseId}
              expenseInfo={expenseInfo}
              route={ROUTES.INSTANT_SPLIT}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default UpdateExpensePage;
