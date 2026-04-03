import { useTranslation } from "react-i18next";
import { useGroupContext } from "../../../context/GroupContext.jsx";
import emojiConstants from "../../../constants/emojiConstants.jsx";
import RESOURCE from "../../../../../shared/constants/domain/resourceConstants.js";
import DeleteResource from "../../DeleteResource/DeleteResource.jsx";
import RenderDataAttributeWithAriaLabel from "../../RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel.jsx";
import LinkToPage from "../../InAppNavigation/LinkToPage/LinkToPage.jsx";
import Emoji from "../../Emoji/Emoji.jsx";
import styles from "./GroupMemberExpense.module.css";

const { RESOURCE_TYPES } = RESOURCE;
const { EXPENSE } = RESOURCE_TYPES;

const GroupMemberExpense = ({ item, onDeleteResource, groupCurrency }) => {
  const { t } = useTranslation();
  const { activeGroupCode, groupMembers } = useGroupContext();

  const {
    _id,
    expenseDescription,
    expensePayer,
    expenseBeneficiaries,
    expenseAmount,
    expenseAmountPerBeneficiary,
    createdAt,
    updatedAt,
  } = item;

  const hasMembers = Boolean(groupMembers?.length);
  const allGroupMembersBenefitFromExpense =
    hasMembers && groupMembers.length === expenseBeneficiaries.length;

  const beneficiaries = allGroupMembersBenefitFromExpense
    ? t("render-expense-beneficiaries-all-group-members")
    : expenseBeneficiaries.map((b) => b.userName).join(", ");

  return (
    <div className={styles.expenses}>
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>
          <Emoji ariaLabel='expense emoji' emoji={emojiConstants.expense} />
        </div>
        <ul>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-description-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={expenseDescription}
              ariaLabel='expense description'
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-paid-by-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={expensePayer.userName}
              ariaLabel='name of the expense payer'
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("render-expense-beneficiaries-beneficiaries")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={beneficiaries}
              ariaLabel='expense beneficiaries'
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-amount-benefitted-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={expenseAmountPerBeneficiary.toFixed(2)}
              ariaLabel='amount each beneficiary has benefitted'
            />
            <span>{groupCurrency}</span>
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-created-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={new Date(createdAt).toLocaleString()}
              ariaLabel='expense creation date'
            />
          </li>

          {createdAt !== updatedAt && (
            <li>
              <span className={styles.key}>
                {t("groupmember-transaction-history-changed-key")}:{" "}
              </span>
              <RenderDataAttributeWithAriaLabel
                attribute={new Date(updatedAt).toLocaleString()}
                ariaLabel='expense last update date'
              />
            </li>
          )}
        </ul>
      </div>

      <ul className={styles.rightColumn}>
        <li className={styles.amountLine}>
          <div className={styles.expenseAmount}>
            <div>
              <RenderDataAttributeWithAriaLabel
                attribute={expenseAmount.toFixed(2)}
                ariaLabel='expense amount'
              />
              <span>{groupCurrency}</span>
            </div>
          </div>
        </li>
        <li className={styles.actionLine}>
          <LinkToPage
            to={`/update-expense/${activeGroupCode}/${_id}`}
            setNestedPreviousRoute>
            {t("groupmember-transaction-history-edit-link")}
          </LinkToPage>
        </li>
        <li className={styles.actionLine}>
          <DeleteResource
            resourceId={_id}
            resourceType={EXPENSE}
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

export default GroupMemberExpense;
