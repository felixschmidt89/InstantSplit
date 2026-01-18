// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../constants/dataConstants";
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchGroupMemberData from "../../hooks/useFetchGroupMemberData";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import Spinner from "../../components/Spinner/Spinner";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";
import DeleteResource from "../../components/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Emoji from "../../components/Emoji/Emoji";
import GroupMemberTotals from "../../components/GroupMemberDetails/GroupMemberTotals/UserTotals/GroupMemberTotals";

// Styles
import styles from "./GroupMemberDetailsPage.module.css";
import GroupMemberName from "../../components/GroupMemberDetails/GroupMemberName/GroupMemberName";

const GroupMemberDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();
  const { groupMemberData, isFetched: groupMemberDataIsFetched } =
    useFetchGroupMemberData(userId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD so balance is considered settled
  if (
    groupMemberData &&
    Math.abs(groupMemberData.userBalance) <= BALANCE_THRESHOLD
  ) {
    groupMemberData.userBalance = 0;
  }

  const balanceClass =
    groupMemberData && groupMemberData.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("groupmember-details-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"groupmember-details"} />
      <InAppNavigationBar back={true} />
      {groupMemberDataIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <span className={styles.emoji}>
            <Emoji
              label={"group member emoji"}
              emoji={emojiConstants.member}></Emoji>
          </span>
          <GroupMemberName userId={userId} groupCode={groupCode} />
          <h2>
            {t("groupmember-details-page-balance-header")}{" "}
            <span className={balanceClass}>
              {groupMemberData.userBalance.toFixed(2)}
              {groupCurrency}
            </span>
          </h2>
          <div className={styles.userBalances}>
            <GroupMemberTotals
              groupMemberData={groupMemberData}
              groupCurrency={groupCurrency}
            />
          </div>
          <div className={styles.transactionHistoryButton}>
            <RouteButton
              route={`groupmember-transaction-history/${groupCode}/${userId}`}
              buttonText={t(
                "groupmember-details-page-transactions-history-button-text",
              )}
              setPreviousRoute={true}
              margin='0px'
              endIcon={"history"}
            />
          </div>
          <div className={styles.deleteGroupMemberButton}>
            <DeleteResource resourceId={userId} resourceType='users' />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default GroupMemberDetailsPage;
