import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";
import useGroupMemberTransactions from "../../hooks/useGroupMemberTransactions";
import { useGroupMembersContext } from "../../context/GroupMembersContext";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";
import UserTransactionsHistory from "../../components/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory";
import NoUserTransactions from "../../components/GroupMemberTransactionsHistory/NoGroupMemberTransactions/NoGroupMemberTransactions";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

import styles from "./GroupMemberTransactionHistoryPage.module.css";

const GroupMemberTransactionHistoryPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();

  // 1. Data Hooks
  const { groupMembers, isFetched: groupMembersIsFetched } =
    useGroupMembersContext();

  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  const {
    transactions,
    isLoading: transactionsIsLoading,
    error: transactionsError,
    removeTransaction,
  } = useGroupMemberTransactions(userId);

  // 2. Aggregate Loading State
  const isPageLoading =
    transactionsIsLoading || !currencyInfoIsFetched || !groupMembersIsFetched;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("groupmember-transaction-history-page-title")}
      />
      <InAppNavigationBar previousRoute={true} home={true} />

      {isPageLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{t("groupmember-transaction-history-page-header")}</h1>

          {transactions.length > 0 ? (
            <UserTransactionsHistory
              groupMemberExpensesAndPayments={transactions}
              groupCode={groupCode}
              onDeleteResource={removeTransaction}
              groupCurrency={groupCurrency}
              groupMembers={groupMembers}
            />
          ) : (
            <NoUserTransactions />
          )}

          <ErrorDisplay error={transactionsError} />
        </div>
      )}
    </main>
  );
};

export default GroupMemberTransactionHistoryPage;
