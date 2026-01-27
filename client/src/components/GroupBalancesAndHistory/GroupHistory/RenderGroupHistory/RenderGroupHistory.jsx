import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog } from "@client-utils/errorUtils";

import useFetchGroupMembers from "@hooks/useFetchGroupMembers";
import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import Spinner from "@components/Spinner/Spinner";
import RenderGroupExpense from "@components/GroupBalancesAndHistory/GroupHistory/RenderGroupExpense/RenderGroupExpense";
import RenderGroupPayment from "@components/GroupBalancesAndHistory/GroupHistory/RenderGroupPayment/RenderGroupPayment";
import NoGroupTransactions from "@components/GroupBalancesAndHistory/GroupHistory/NoGroupTransactions/NoGroupTransactions";
import ErrorModal from "@components/ErrorModal/ErrorModal";
import NotEnoughGroupMembers from "@components/GroupBalancesAndHistory/NotEnoughGroupMembers/NotEnoughGroupMembers";
import RenderGroupExpensesTotal from "@components/GroupBalancesAndHistory/GroupHistory/RenderTotalGroupExpenses/RenderGroupExpensesTotal";

import styles from "./RenderGroupHistory.module.css";

import { API_URL } from "@client-constants/apiConstants";

const RenderGroupHistory = ({ groupCode, groupCurrency }) => {
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const [groupExpensesAndPayments, setGroupExpensesAndPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/groups/${groupCode}/expenses-and-payments`,
        );
        const { groupExpensesAndPayments: data } = response.data;
        devLog("Group expenses and payments data fetched:", response);

        if (data?.length) {
          const modifiedData = data
            .map((item) => ({
              ...item,
              itemId: item._id,
              itemType: item.expenseDescription
                ? "expense"
                : item.paymentAmount
                  ? "payment"
                  : "unknown",
              createdAt: new Date(item.createdAt),
            }))
            .sort((a, b) => b.createdAt - a.createdAt);

          devLog("Group expenses and payments data modified:", modifiedData);
          setGroupExpensesAndPayments(modifiedData);
        }

        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group expenses and payments:", error);
        setError(t("generic-error-message"));
        displayErrorModal();
        setIsLoading(false);
      }
    };

    fetchGroupExpensesAndPayments();
  }, [groupCode, t, displayErrorModal]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {groupExpensesAndPayments?.length ? (
        <>
          <RenderGroupExpensesTotal
            groupCode={groupCode}
            groupCurrency={groupCurrency}
          />
          <div className={styles.container}>
            <ul>
              {groupExpensesAndPayments.map((item) => (
                <li key={item._id}>
                  {item.expenseDescription ? (
                    <RenderGroupExpense
                      item={item}
                      groupCode={groupCode}
                      groupCurrency={groupCurrency}
                      groupMembers={groupMembers}
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
          {isFetched && groupMembers?.length > 1 ? (
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

export default RenderGroupHistory;
