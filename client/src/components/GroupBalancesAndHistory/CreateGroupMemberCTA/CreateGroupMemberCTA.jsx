// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Components
import GroupActionsEmojiButton from "../../GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./CreateGroupMemberCTA.module.css";

/**
 * Component for rendering a call-to-action (CTA) to create users.
 * @param {boolean} props.isPayment - Indicates whether the CTA is related to a payment. Defaults to true.
 * @returns {JSX.Element} React component. */
const CreateGroupMemberCTA = ({ isPayment = true }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.callToAction}>
        {isPayment
          ? t("create-groupmember-cta-payment-copy")
          : t("create-groupmember-cta-expense-copy")}
        :
        <div className={styles.icon}>
          <GroupActionsEmojiButton
            route={"create-group-members"}
            emoji={emojiConstants.member}
            explanationText={t("active-group-bar-member-emoji-copy")}
            ariaLabel='add group member emoji'
          />
        </div>
      </p>
    </div>
  );
};

export default CreateGroupMemberCTA;
