import { Link } from "react-router-dom";

import emojiConstants from "../../../../constants/emojiConstants.jsx";

import Emoji from "../../../Emoji/Emoji.jsx";

import styles from "./GroupMemberBalance.module.css";

const GroupMemberBalance = ({
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

export default GroupMemberBalance;
