import React from "react";

// Components
import RenderGroupMemberPayment from "../RenderGroupMemberPayment/RenderGroupMemberPayment";
import RenderGroupMemberExpense from "../RenderGroupMemberExpense/RenderGroupMemberExpense";
import NoUserTransactions from "../NoGroupMemberTransactions/NoGroupMemberTransactions";

// Styles
import styles from "./GroupMemberTransactionsHistory.module.css";

const GroupMemberTransactionsHistory = ({
  transactions,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  if (!transactions?.length) {
    return <NoUserTransactions />;
  }

  return (
    <div className={styles.container}>
      <ul>
        {transactions.map((item) => (
          <li className={styles.item} key={item._id || item.itemId}>
            {item.itemType === "expense" ? (
              <RenderGroupMemberExpense
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
                groupCurrency={groupCurrency}
                groupMembers={groupMembers}
              />
            ) : (
              <RenderGroupMemberPayment
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
                groupCurrency={groupCurrency}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupMemberTransactionsHistory;
