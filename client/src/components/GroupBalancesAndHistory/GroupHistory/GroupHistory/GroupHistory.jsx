import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "../../../../context/GroupContext.jsx";
import { useGlobalError } from "../../../../context/ErrorContext.jsx";
import fetchGroupTransactions from "../../../../api/groups/fetchGroupTransactions.js";
import debugLog from "../../../../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../../../../shared/constants/system/loggerConstants.js";
import RESOURCE from "../../../../../../shared/constants/domain/resourceConstants.js";
import usePolling from "../../../../hooks/usePolling.jsx";
import Spinner from "../../../Spinner/Spinner.jsx";
import RenderGroupExpensesTotal from "../RenderTotalGroupExpenses/RenderGroupExpensesTotal.jsx";
import RenderGroupExpense from "../GroupExpense/GroupExpense.jsx";
import RenderGroupPayment from "../GroupPayment/GroupPayment.jsx";
import NoGroupTransactions from "../NoGroupTransactions/NoGroupTransactions.jsx";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers.jsx";
import styles from "./GroupHistory.module.css";

const { LOG_LEVELS_INFO, LOG_LEVELS_ERROR } = LOG_LEVELS;
const { RESOURCE_TYPES } = RESOURCE;
const { EXPENSE } = RESOURCE_TYPES;

const GroupHistory = ({ groupCode, groupCurrency }) => {
  const { t } = useTranslation();
  const { showError } = useGlobalError();
  const { groupMembers, isFetched: isMembersFetched } = useGroupContext();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasMultipleMembers = groupMembers?.length > 1;
  const hasTransactions = Boolean(transactions?.length);
  const hasSufficientMembers = isMembersFetched && hasMultipleMembers;

  const getGroupHistory = useCallback(
    async (isPollingCall = false) => {
      try {
        if (!isPollingCall) {
          setIsLoading(true);
        }

        const { transactions: fetchedTransactions } =
          await fetchGroupTransactions(groupCode);

        const hasFetchedData = Boolean(fetchedTransactions?.length);

        if (hasFetchedData) {
          const formattedTransactions = fetchedTransactions.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }));

          debugLog(
            "Group transactions processed",
            { count: formattedTransactions.length, isPolling: isPollingCall },
            LOG_LEVELS_INFO,
          );

          setTransactions(formattedTransactions);
        }
      } catch (error) {
        debugLog(
          "Error fetching group history",
          { error: error.message },
          LOG_LEVELS_ERROR,
        );

        if (!isPollingCall) {
          showError(t("generic-error-message"));
        }
      } finally {
        if (!isPollingCall) {
          setIsLoading(false);
        }
      }
    },
    [groupCode, t, showError],
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
      {hasTransactions ? (
        <>
          <RenderGroupExpensesTotal
            groupCode={groupCode}
            groupCurrency={groupCurrency}
          />
          <div className={styles.container}>
            <ul className={styles.list}>
              {transactions.map((item) => {
                const isExpense = item.itemType === EXPENSE;
                const itemId = item.itemId || item._id;

                return (
                  <li key={itemId}>
                    {isExpense ? (
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
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.issue}>
          {hasSufficientMembers ? (
            <NoGroupTransactions />
          ) : (
            <NotEnoughGroupMembers />
          )}
        </div>
      )}
    </div>
  );
};

export default GroupHistory;
