import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";
import useGroupMemberTransactions from "../../hooks/useGroupMemberTransactions";
import { useGroupMembersContext } from "../../context/GroupMembersContext";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";
import GroupMemberTransactionsHistory from "../../components/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./GroupMemberTransactionHistoryPage.module.css";

const GroupMemberTransactionHistoryPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();

  const { groupMembers, isFetched: groupMembersIsFetched } =
    useGroupMembersContext();

  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  const {
    transactions,
    isLoading: transactionsIsLoading,
    error: transactionsError,
    refetchTransactions,
  } = useGroupMemberTransactions(userId);

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
          <GroupMemberTransactionsHistory
            transactions={transactions}
            groupCode={groupCode}
            onDeleteResource={refetchTransactions}
            groupCurrency={groupCurrency}
            groupMembers={groupMembers}
          />

          {transactionsError && <ErrorDisplay error={transactionsError} />}
        </div>
      )}
    </main>
  );
};

export default GroupMemberTransactionHistoryPage;
