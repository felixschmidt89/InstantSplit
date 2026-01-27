// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../Emoji/Emoji";

// Styles
import styles from "./RenderGroupMemberBalance.module.css";

/**
 * Component for rendering group member name and balance
 *
 * @param {Object[]} userDetails - The array of user details.
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderGroupMemberBalance = ({
  groupMemberDetails,
  groupCode,
  groupCurrency,
}) => (
  <div className={styles.balancesContainer}>
    <ul>
      {groupMemberDetails.map((user) => (
        <li key={user.userId} className={styles.groupMemberListItem}>
          <Link
            to={`/groupmember-details/${groupCode}/${user.userId}`}
            className={styles.groupMemberListItemLink}>
            <div className={styles.groupMemberDetails}>
              <div className={styles.leftColumn}>
                <span className={styles.emoji}>
                  <Emoji
                    ariaLabel={"group member emoji"}
                    emoji={emojiConstants.member}
                  />
                </span>
                <span className={styles.groupMemberName}>{user.userName}</span>
              </div>
              <div className={styles.rightColumn}>
                {/* Visually indicate negative userBalance*/}
                <div
                  className={`${styles.userBalance} ${
                    user.userBalance >= 0
                      ? styles.positiveBalance
                      : styles.negativeBalance
                  }`}>
                  {user.userBalance.toFixed(2) + `${groupCurrency}`}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RenderGroupMemberBalance;
