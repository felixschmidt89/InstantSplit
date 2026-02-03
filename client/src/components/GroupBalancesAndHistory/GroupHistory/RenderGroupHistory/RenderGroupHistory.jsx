import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import styles from "./RenderGroupHistory.module.css";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility.jsx";
import {
  GroupMembersProvider,
  useGroupMembers,
} from "../../../../context/GroupMembersContext.jsx";
import { LOG_LEVELS } from "../../../../../../shared/constants/debugConstants.js";
import { TRANSACTION_TYPES } from "../../../../../../shared/constants/transactionConstants.js";
import { fetchGroupTransactions } from "../../../../api/groups/fetchGroupTransactions.js";
import { debugLog } from "../../../../../../shared/utils/debug/debugLog.js";
import Spinner from "../../../Spinner/Spinner.jsx";
import { usePolling } from "../../../../hooks/usePolling.jsx";
import RenderGroupExpensesTotal from "../RenderTotalGroupExpenses/RenderGroupExpensesTotal.jsx";
import RenderGroupExpense from "../RenderGroupExpense/RenderGroupExpense.jsx";
import RenderGroupPayment from "../RenderGroupPayment/RenderGroupPayment.jsx";
import NoGroupTransactions from "../NoGroupTransactions/NoGroupTransactions.jsx";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers.jsx";
import ErrorModal from "../../../ErrorModal/ErrorModal.jsx";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { EXPENSE } = TRANSACTION_TYPES;

const GroupHistoryContent = ({ groupCode, groupCurrency }) => {
  const { t } = useTranslation();

  const { groupMembers, isFetched: isMembersFetched } = useGroupMembers();

  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGroupHistory = useCallback(
    async (isPolling = false) => {
      try {
        if (!isPolling) setIsLoading(true);

        const { transactions: fetchedTransactions } =
          await fetchGroupTransactions(groupCode);

        if (fetchedTransactions?.length) {
          const formattedTransactions = fetchedTransactions.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }));

          debugLog(
            "Group transactions processed",
            { count: formattedTransactions.length, isPolling },
            INFO,
          );
          setTransactions(formattedTransactions);
        }

        setError(null);
      } catch (error) {
        debugLog(
          "Error fetching group history",
          { error: error.message },
          LOG_ERROR,
        );

        if (!isPolling) {
          setError(t("generic-error-message"));
          displayErrorModal();
        }
      } finally {
        if (!isPolling) setIsLoading(false);
      }
    },
    [groupCode, t, displayErrorModal],
  );

  usePolling(getGroupHistory);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!!transactions?.length ? (
        <>
          <RenderGroupExpensesTotal
            groupCode={groupCode}
            groupCurrency={groupCurrency}
          />
          <div className={styles.container}>
            <ul>
              {transactions.map((item) => (
                <li key={item.itemId}>
                  {item.itemType === EXPENSE ? (
                    <RenderGroupExpense
                      item={item}
                      groupCode={groupCode}
                      groupCurrency={groupCurrency}
                    />
                  ) : (
                    <RenderGroupPayment
                      item={item}
                      groupCode={groupCode}
                      groupCurrency={groupCurrency}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.issue}>
          {isMembersFetched && groupMembers?.length > 1 ? (
            <NoGroupTransactions />
          ) : (
            <NotEnoughGroupMembers />
          )}
        </div>
      )}

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

const RenderGroupHistory = ({ groupCode, groupCurrency }) => {
  return (
    <GroupMembersProvider groupCode={groupCode}>
      <GroupHistoryContent
        groupCode={groupCode}
        groupCurrency={groupCurrency}
      />
    </GroupMembersProvider>
  );
};

export default RenderGroupHistory;
