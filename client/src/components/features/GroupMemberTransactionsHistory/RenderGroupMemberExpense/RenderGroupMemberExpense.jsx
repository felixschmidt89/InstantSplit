// React and Third Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import DeleteResource from "../../../common/DeleteResource/DeleteResource";
import RenderDataAttributeWithAriaLabel from "../../../common/RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";
import LinkToPage from "../../../InAppNavigation/LinkToPage/LinkToPage";
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderGroupMemberExpense.module.css";
/**
 * Renders a single group member expense component.
 * @param {object} props - The props object.
 * @param {object} props.item - The expense item to be displayed.
 * @param {string} props.groupCode - The groupCode of the group to which the expense belongs.
 * @param {Function} props.onDeleteResource - function to handle the deletion of the expense item to trigger a refresh in parent component.
 * @param {string} props.groupCurrency - The currency used within the group.
 * @param {Array} props.groupMembers - Array of group members.
 * @returns {JSX.Element} React Component.
 */
const RenderGroupMemberExpense = ({
  item,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  const { t } = useTranslation();

  const allGroupMembersBenefitFromExpense =
    groupMembers.length === item.expenseBeneficiaries.length;

  const beneficiaries = allGroupMembersBenefitFromExpense
    ? t("render-expense-beneficiaries-all-group-members")
    : item.expenseBeneficiaries
        .map((beneficiary) => beneficiary.userName)
        .join(", ");

  return (
    <div className={styles.expenses}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>
          <Emoji
            ariaLabel={"expense emoji"}
            emoji={emojiConstants.expense}></Emoji>
        </div>
        <ul>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-description-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.expenseDescription}
              ariaLabel={"expense description"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-paid-by-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.expensePayer.userName}
              ariaLabel={"name of the expense payer"}
            />
          </li>

          <li>
            <span className={styles.key}>
              {t("render-expense-beneficiaries-beneficiaries")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={beneficiaries}
              ariaLabel={"expense beneficiaries"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-amount-benefitted-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.expenseAmountPerBeneficiary.toFixed(2)}
              ariaLabel={"amount each beneficiary has benefitted"}
            />
            <span>{groupCurrency}</span>
          </li>

          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-created-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={new Date(item.createdAt).toLocaleString()}
              ariaLabel={"expense creation date"}
            />
          </li>

          {item.createdAt !== item.updatedAt && (
            <li>
              <span className={styles.key}>
                {t("groupmember-transaction-history-changed-key")}:{" "}
              </span>
              <RenderDataAttributeWithAriaLabel
                attribute={new Date(item.updatedAt).toLocaleString()}
                ariaLabel={"expense last update date"}
              />
            </li>
          )}
        </ul>
      </div>
      {/* Right Column */}{" "}
      <ul className={styles.rightColumn}>
        <li className={styles.amountLine}>
          <div className={styles.expenseAmount}>
            <div>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseAmount.toFixed(2)}
                ariaLabel={"expense amount"}
              />
              <span>{groupCurrency}</span>
            </div>
          </div>
        </li>
        <li className={styles.actionLine}>
          <LinkToPage
            to={`/update-expense/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}
            color='var(--color-signal)'
            hoverColor='var(--color-signal-dark'>
            {t("groupmember-transaction-history-edit-link")}
          </LinkToPage>
        </li>
        <li className={styles.actionLine}>
          <DeleteResource
            resourceId={item._id}
            resourceType={"expenses"}
            onDeleteResource={onDeleteResource}
            isButton={false}
            navigateOnDelete={false}
            showResourceType={false}
          />
        </li>
      </ul>
    </div>
  );
};

export default RenderGroupMemberExpense;
