import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../context/GroupContext";
import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";
import RenderExpenseBeneficiaries from "../../components/Expenses/RenderExpenseBeneficiaries/RenderExpenseBeneficiaries";
import RenderExpenseDetails from "../../components/Expenses/RenderExpenseDetails/RenderExpenseDetails";
import RenderResourceCreated from "../../components/RenderResourceCreated/RenderResourceCreated";
import DeleteResource from "../../components/DeleteResource/DeleteResource";
import InAppNavigation from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Emoji from "../../components/Emoji/Emoji.jsx";

import emojiConstants from "../../constants/emojiConstants";
import LOG_LEVELS from "../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../shared/utils/debug/debugLog";

import styles from "./ExpenseDetailsPage.module.css";

const { INFO } = LOG_LEVELS;

const ExpenseDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, itemId } = useParams();

  const { groupMembers, isFetched: groupMembersIsFetched } = useGroupContext();

  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);
  const { expenseInfo, isFetched: expenseInfoIsFetched } =
    useFetchExpenseInfo(itemId);

  debugLog("ExpenseInfo fetched", { expenseInfo }, INFO);
  debugLog("Group currency fetched:", { currencyInfoIsFetched }, INFO);
  debugLog("Group members fetched", { count: groupMembers?.length }, INFO);

  const isPageLoading =
    !expenseInfoIsFetched ||
    !currencyInfoIsFetched ||
    !groupMembersIsFetched ||
    !expenseInfo;
  const allGroupMembersBenefitFromExpense =
    groupMembers?.length === expenseInfo?.expenseBeneficiaries?.length;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("expense-details-page-title")} />
      <InAppNavigation back={true} />

      {isPageLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <div className={styles.emoji}>
            <Emoji ariaLabel={"expense emoji"} emoji={emojiConstants.expense} />
          </div>

          <h1>{expenseInfo.expenseDescription}</h1>

          <div className={styles.detailsBox}>
            <RenderExpenseDetails
              expenseInfo={expenseInfo}
              groupCurrency={groupCurrency}
              expenseAmountPerBeneficiary={
                expenseInfo.expenseAmountPerBeneficiary
              }
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
            />
            <RenderExpenseBeneficiaries
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
              allGroupMembersBenefitFromExpense={
                allGroupMembersBenefitFromExpense
              }
            />
            <RenderResourceCreated
              createdAt={expenseInfo.createdAt}
              updatedAt={expenseInfo.updatedAt}
            />
          </div>

          <RouteButton
            route={`update-expense/${groupCode}/${itemId}`}
            buttonText={t("expense-details-edit-expense-button-text")}
            setPreviousRoute={true}
            endIcon={"edit"}
          />
          <DeleteResource resourceId={itemId} resourceType='expenses' />
        </div>
      )}
    </main>
  );
};

export default ExpenseDetailsPage;
