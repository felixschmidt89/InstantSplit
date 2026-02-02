// React and Third-Party Libraries
import React from "react";

// Components
import RenderGroupMemberPayment from "../RenderGroupMemberPayment/RenderGroupMemberPayment";
import RenderGroupMemberExpense from "../RenderGroupMemberExpense/RenderGroupMemberExpense";

// Styles
import styles from "./GroupMemberTransactionsHistory.module.css";

/**
 * Parent component rendering group member transactions history including every single expense and payment of a group member.
 * @param {Object} props - The component props.
 * @param {Array} props.groupMemberExpensesAndPayments - An array of group member expenses and payments.
 * @param {Array} props.groupMembers - An array of the names of the group members.

 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDeleteItem - Callback function to handle deletion of an expense or a payment.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element|null} React component or null if no transactions.
 */
const GroupMemberTransactionsHistory = ({
  groupMemberExpensesAndPayments,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  if (groupMemberExpensesAndPayments.length === 0) {
    return null;
  }

  // Sort expenses and payments by date in descending order
  const sortedExpensesAndPayments = groupMemberExpensesAndPayments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.container}>
      <ul>
        {sortedExpensesAndPayments.map((item) => (
          <li className={styles.item} key={item._id}>
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
