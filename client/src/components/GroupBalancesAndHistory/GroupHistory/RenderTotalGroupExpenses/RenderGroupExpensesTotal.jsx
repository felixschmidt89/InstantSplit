// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupExpensesTotal from "../../../../hooks/useFetchGroupExpensesTotal";

// Styles
import styles from "./RenderGroupExpensesTotal.module.css";

/**
 * Component for rendering expenses total per group
 *
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderGroupExpensesTotal = ({ groupCode, groupCurrency }) => {
  const { t } = useTranslation();
  const { expensesTotal, isFetched } = useFetchGroupExpensesTotal(groupCode);
  return (
    isFetched && (
      <div className={styles.totalExpenses}>
        {t("total-group-expenses-copy")}:
        <span className={styles.totalExpensesAmount}>
          {" "}
          {expensesTotal.toFixed(2)}
          {groupCurrency}
        </span>
      </div>
    )
  );
};

export default RenderGroupExpensesTotal;
