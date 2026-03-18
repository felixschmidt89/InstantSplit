import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";

import Emoji from "../../../Emoji/Emoji.js";
import RenderReactIcon from "../../../RenderReactIcon/RenderReactIcon.jsx";
import { useGroupContext } from "../../../../context/GroupContext.jsx";
import { LOG_LEVELS } from "../../../../../../shared/constants/system/loggerConstants.js";
import { debugLog } from "../../../../../../shared/utils/debug/debugLog.js";
import emojiConstants from "../../../../constants/emojiConstants.jsx";

import styles from "./GroupPayment.module.css";

const { INFO } = LOG_LEVELS;

const GroupPayment = ({ item, groupCode, groupCurrency }) => {
  const { getMemberName } = useGroupContext();

  const makerIdentifier = item.paymentMaker?._id || item.paymentMaker;
  const recipientIdentifier =
    item.paymentRecipient?._id || item.paymentRecipient;

  const makerName = getMemberName(makerIdentifier);
  const recipientName = getMemberName(recipientIdentifier);

  debugLog(
    "Rendering payment item",
    { itemId: item.itemId, maker: makerName, recipient: recipientName },
    INFO,
  );

  return (
    <Link
      to={`/payment-details/${groupCode}/${item.itemId}`}
      className={styles.paymentLink}>
      <div className={styles.payment}>
        <div className={styles.leftColumn}>
          <div className={styles.paymentEmoji}>
            <Emoji ariaLabel='payment emoji' emoji={emojiConstants.payment} />
          </div>
          <span className={styles.paymentInfo}>
            <span>{makerName}</span>
            <span className={styles.paymentTo}>
              <RenderReactIcon icon={IoArrowForwardOutline} translateY={0.2} />
            </span>
            <span>{recipientName}</span>
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

export default GroupPayment;
