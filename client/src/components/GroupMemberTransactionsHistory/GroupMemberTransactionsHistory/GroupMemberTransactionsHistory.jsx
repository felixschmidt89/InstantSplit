import RenderGroupMemberPayment from "../RenderGroupMemberPayment/RenderGroupMemberPayment.jsx";
import RenderGroupMemberExpense from "../GroupMemberExpense/GroupMemberExpense.jsx";
import NoUserTransactions from "../NoGroupMemberTransactions/NoGroupMemberTransactions.jsx";
import RESOURCE from "../../../../../shared/constants/domain/resourceConstants.js";
import styles from "./GroupMemberTransactionsHistory.module.css";

const { RESOURCE_TYPES } = RESOURCE;
const { EXPENSE } = RESOURCE_TYPES;

const GroupMemberTransactionsHistory = ({
  transactions,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  const hasTransactions = Boolean(transactions?.length);

  if (!hasTransactions) {
    return <NoUserTransactions />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {transactions.map((item) => {
          const isExpense = item.itemType === EXPENSE;
          const itemId = item._id || item.itemId;

          return (
            <li className={styles.item} key={itemId}>
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
