import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useExpenseUpdate from "../../hooks/useExpenseUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import UpdateExpense from "../../components/Expenses/UpdateExpense/UpdateExpense";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./UpdateExpensePage.module.css";

import {
  GroupMembersProvider,
  useGroupMembersContext,
} from "../../context/GroupMembersContext";

const UpdateExpenseContent = ({ expenseId, groupCode }) => {
  const { t } = useTranslation();

  const { isFetched: isMembersFetched } = useGroupMembersContext();

  const { isLoading: isExpenseLoading, expenseInfo } =
    useExpenseUpdate(expenseId);

  if (!isMembersFetched || isExpenseLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className={styles.header}>{t("update-expense-page-header")}</h1>
      <div className={styles.container}>
        <UpdateExpense
          groupCode={groupCode}
          expenseId={expenseId}
          expenseInfo={expenseInfo}
          route={ROUTES.INSTANT_SPLIT}
        />
      </div>
    </>
  );
};

const UpdateExpensePage = () => {
  const { groupCode, expenseId } = useParams();
  const { t } = useTranslation();

  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-expense-page-title")} />

      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute home />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute home />
      )}

      <GroupMembersProvider groupCode={groupCode}>
        <UpdateExpenseContent expenseId={expenseId} groupCode={groupCode} />
      </GroupMembersProvider>
    </main>
  );
};

export default UpdateExpensePage;
