import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./RenderGroupHistory.module.css";

import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import useFetchGroupMembers from "../../../../hooks/useFetchGroupMembers";
import { devLog } from "../../../../utils/errorUtils";
import RenderGroupExpensesTotal from "../RenderTotalGroupExpenses/RenderGroupExpensesTotal";
import Spinner from "../../../Spinner/Spinner";
import RenderGroupExpense from "../RenderGroupExpense/RenderGroupExpense";
import RenderGroupPayment from "../RenderGroupPayment/RenderGroupPayment";
import NoGroupTransactions from "../NoGroupTransactions/NoGroupTransactions";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers";
import ErrorModal from "../../../ErrorModal/ErrorModal";
import { fetchGroupTransactions } from "../../../../api/groups/fetchGroupTransactions.js";

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
        const data = await fetchGroupTransactions(groupCode);
        console.log("data");

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
