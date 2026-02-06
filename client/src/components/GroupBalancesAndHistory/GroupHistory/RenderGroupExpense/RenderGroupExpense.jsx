import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./RenderGroupExpense.module.css";

import { useGroupMembersContext } from "../../../../context/GroupMembersContext.jsx";
import Emoji from "../../../Emoji/Emoji";
import { LOG_LEVELS } from "../../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../../shared/utils/debug/debugLog.js";
import emojiConstants from "../../../../constants/emojiConstants.jsx";

const { INFO } = LOG_LEVELS;

const RenderGroupExpense = ({ item, groupCode, groupCurrency }) => {
  const { t } = useTranslation();

  const { getMemberName, groupMembers } = useGroupMembersContext();

  const payerId = item.expensePayer?._id || item.expensePayer;
  const payerName = getMemberName(payerId);

  const allGroupMembersBenefitFromExpense =
    groupMembers && item.expenseBeneficiaries.length === groupMembers.length;

  debugLog(
    "Rendering expense item",
    { itemId: item.itemId, payer: payerName },
    INFO,
  );

  return (
    <Link
      to={`/expense-details/${groupCode}/${item.itemId}`}
      className={styles.expense}>
      <div className={styles.leftColumn}>
        <span className={styles.expenseEmoji}>
          <Emoji ariaLabel='expense emoji' emoji={emojiConstants.expense} />
        </span>

        {allGroupMembersBenefitFromExpense && (
          <span className={styles.forAll}>
            {t("render-group-expense-for-all-badge")}
          </span>
        )}

        <span className={styles.expenseInfo}>
          {item.expenseDescription}
          {": "}
          <span className={styles.payer}> {payerName}</span>
        </span>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.expenseAmount}>
          {item.expenseAmount.toFixed(2)}
          {groupCurrency}
        </div>
      </div>
    </Link>
  );
};

export default RenderGroupExpense;
