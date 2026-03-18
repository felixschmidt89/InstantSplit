import RenderGroupMemberPayment from "../RenderGroupMemberPayment/RenderGroupMemberPayment";
import RenderGroupMemberExpense from "../GroupMemberExpense/GroupMemberExpense.jsx";
import NoUserTransactions from "../NoGroupMemberTransactions/NoGroupMemberTransactions";
import { TRANSACTION_TYPES } from "../../../../../shared/constants/domain/transactionConstants.js";

import styles from "./GroupMemberTransactionsHistory.module.css";

const { EXPENSE } = TRANSACTION_TYPES;

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
        {transactions.map((item) => {
          const isExpense = item.itemType === EXPENSE;

          return (
            <li className={styles.item} key={item._id || item.itemId}>
              {isExpense ? (
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
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMemberTransactionsHistory;
