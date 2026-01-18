// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./RenderExpenseBeneficiaries.module.css";

/**
 * Renders a list of expense beneficiaries.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.expenseBeneficiaries - The array of expense beneficiaries.
 * @param {boolean} props.allGroupMembersBenefitFromExpense - Indicates whether all group members benefit from the expense.
 * @returns {JSX.Element} React component.
 */
const RenderExpenseBeneficiaries = ({
  expenseBeneficiaries,
  allGroupMembersBenefitFromExpense,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <span className={styles.key}>
        {" "}
        {t("render-expense-beneficiaries-beneficiaries")}:
      </span>
      {allGroupMembersBenefitFromExpense ? (
        <span className={styles.beneficiariesList}>
          <span className={styles.noWrap}>
            {t("render-expense-beneficiaries-all-group-members")}
          </span>
        </span>
      ) : (
        <span className={styles.beneficiariesList}>
          {expenseBeneficiaries.map((beneficiary, index) => (
            <span key={beneficiary._id} className={styles.beneficiary}>
              <span className={styles.noWrap}>
                {beneficiary.userName}
                {/* Add a non-breaking space after the comma for all items except for the last one */}
                {index === expenseBeneficiaries.length - 1 ? "" : ",\u00A0"}
              </span>
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default RenderExpenseBeneficiaries;
