// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "axios";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import UserTransactionsHistory from "../../components/features/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory/GroupMemberTransactionsHistory";
import NoUserTransactions from "../../components/features/GroupMemberTransactionsHistory/NoGroupMemberTransactions/NoGroupMemberTransactions";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./GroupMemberTransactionHistoryPage.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GroupMemberTransactionHistoryPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();
  const [groupMemberExpensesAndPayments, setGroupMemberExpensesAndPayments] =
    useState([]);
  const { groupMembers, isFetched: groupMembersIsFetched } =
    useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  /**
   * Updates groupMemberExpensesAndPayments state to trigger a page rerender after the deletion of a resource.
   *
   * @param {string} itemId - The ID of the deleted resource.
   */
  const updateGroupMemberExpensesAndPaymentsAfterResourceDeletion = (
    itemId,
  ) => {
    const updatedItems = groupMemberExpensesAndPayments.filter(
      (item) => item._id !== itemId,
    );
    devLog("Group member expenses and payments updated:", updatedItems);
    setGroupMemberExpensesAndPayments(updatedItems);
  };

  useEffect(() => {
    const fetchGroupMemberExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/${userId}/expenses-and-payments`,
        );
        devLog(`User ${userId} expenses and payments fetched:`, response);
        const groupMemberTransactionalData =
          response.data.userExpensesAndPayments;
        devLog("userExpensesAndPayments:", groupMemberTransactionalData);
        setGroupMemberExpensesAndPayments(groupMemberTransactionalData);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group member expenses and payments:", error);
        setError(t("generic-error-message"));
        setIsLoading(false);
      }
    };

    fetchGroupMemberExpensesAndPayments();
  }, [userId]);
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("groupmember-transaction-history-page-title")}
      />
      <PiratePx COUNT_IDENTIFIER={"groupmember-transaction-history"} />
      <InAppNavigationBar previousRoute={true} home={true} />
      {isLoading && currencyInfoIsFetched && groupMembersIsFetched ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{t("groupmember-transaction-history-page-header")}</h1>
          {groupMemberExpensesAndPayments.length > 0 ? (
            <UserTransactionsHistory
              groupMemberExpensesAndPayments={groupMemberExpensesAndPayments}
              groupCode={groupCode}
              onDeleteResource={
                updateGroupMemberExpensesAndPaymentsAfterResourceDeletion
              }
              groupCurrency={groupCurrency}
              groupMembers={groupMembers}
            />
          ) : (
            <NoUserTransactions />
          )}
          <ErrorDisplay error={error} />
        </div>
      )}
    </main>
  );
};

export default GroupMemberTransactionHistoryPage;
