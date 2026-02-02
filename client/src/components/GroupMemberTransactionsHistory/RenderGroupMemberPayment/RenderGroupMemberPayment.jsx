// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Components
import DeleteResource from "../../DeleteResource/DeleteResource";
import Emoji from "../../Emoji/Emoji";
import RenderDataAttributeWithAriaLabel from "../../RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";
import LinkToPage from "../../InAppNavigation/LinkToPage/LinkToPage";

// Styles
import styles from "./RenderGroupMemberPayment.module.css";

/**
 * Component for rendering details of a groupmember's single payment.
 * @param {Object} props - The component props.
 * @param {Object} props.item - The payment item object.
 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDelete - Callback function for deleting the payment.
 * @returns {JSX.Element} React component. */
const NoGroupMemberTransactions = ({
  item,
  groupCode,
  onDeleteResource,
  groupCurrency,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.payments}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <span className={styles.paymentEmoji}>
          <Emoji
            ariaLabel={"payment emoji"}
            emoji={emojiConstants.payment}></Emoji>
        </span>
        <ul>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-payment-by-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentMaker.userName}
              ariaLabel={"name of the payment maker"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-payment-to-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentRecipient.userName}
              ariaLabel={"name of the payment recipient"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("groupmember-transaction-history-created-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={new Date(item.createdAt).toLocaleString()}
              ariaLabel={"payment creation date"}
            />
          </li>
          {item.createdAt !== item.updatedAt && (
            <li>
              <span className={styles.key}>
                {t("groupmember-transaction-history-changed-key")}:{" "}
              </span>
              <RenderDataAttributeWithAriaLabel
                attribute={new Date(item.updatedAt).toLocaleString()}
                ariaLabel={"payment last update date"}
              />
            </li>
          )}
        </ul>
      </div>
      {/* Right Column */}
      <ul className={styles.rightColumn}>
        <li className={styles.amountLine}>
          <div className={styles.paymentAmount}>
            <div>
              <RenderDataAttributeWithAriaLabel
                attribute={item.paymentAmount.toFixed(2)}
                ariaLabel={"payment amount"}
              />
              <span>{groupCurrency}</span>
            </div>
          </div>
        </li>
        <li className={styles.actionLine}>
          <LinkToPage
            to={`/update-payment/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}
            color='var(--color-signal)'
            hoverColor='var(--color-signal-dark'>
            {t("groupmember-transaction-history-edit-link")}
          </LinkToPage>
        </li>
        <li className={styles.actionLine}>
          <DeleteResource
            resourceId={item._id}
            resourceType={"payments"}
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

export default NoGroupMemberTransactions;
