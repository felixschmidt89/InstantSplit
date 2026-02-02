// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";
import Emoji from "../../../Emoji/Emoji";

// Styles
import styles from "./RenderGroupPayment.module.css";
import RenderReactIcon from "../../../RenderReactIcon/RenderReactIcon";

/**
 * Component for rendering a single group payment.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.item - The payment item to be rendered.
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderGroupPayment = ({ item, groupCode, groupCurrency }) => {
  return (
    <Link
      to={`/payment-details/${groupCode}/${item.itemId}`}
      className={styles.paymentLink}>
      <div className={styles.payment}>
        <div className={styles.leftColumn}>
          <div className={styles.paymentEmoji}>
            <Emoji
              ariaLabel={"payment emoji"}
              emoji={emojiConstants.payment}></Emoji>
          </div>
          <span className={styles.paymentInfo}>
            <span>{item.paymentMaker.userName}</span>{" "}
            <span className={styles.paymentTo}>
              <RenderReactIcon icon={IoArrowForwardOutline} translateY={0.2} />
            </span>
            <span>{item.paymentRecipient.userName}</span>
          </span>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.paymentAmount}>
            {item.paymentAmount.toFixed(2)}
            {groupCurrency}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RenderGroupPayment;
