import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../context/GroupContext";
import useExpenseUpdate from "../../hooks/useUpdateExpense";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import UpdateExpense from "../../components/Expenses/UpdateExpense/UpdateExpense";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import { ROUTES } from "../../constants/routesConstants";

import styles from "./UpdateExpensePage.module.css";

const UpdateExpensePage = () => {
  const { groupCode, expenseId } = useParams();
  const { t } = useTranslation();

  const { isFetched: isMembersFetched } = useGroupContext();
  const { isLoading: isExpenseLoading, expenseInfo } =
    useExpenseUpdate(expenseId);

  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  const isPageLoading = !isMembersFetched || isExpenseLoading;
  // TODO: Update semantic variable name
  const showGroupHistoryNavigation = isChecked && openedViaGroupHistory;
  const showUserHistoryNavigation =
    isChecked && openedViaUserTransactionsHistory;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-expense-page-title")} />
      {showGroupHistoryNavigation && <InAppNavigationBar previousRoute home />}
      {showUserHistoryNavigation && (
        <InAppNavigationBar nestedPreviousRoute home />
      )}

      {isPageLoading ? (
        <Spinner />
      ) : (
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
      )}
    </main>
  );
};

export default UpdateExpensePage;
