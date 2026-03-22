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
      {groupMemberDetails.map((member) => (
        <li key={member.memberId} className={styles.groupMemberListItem}>
          <Link
            to={`/groupmember-details/${groupCode}/${member.memberId}`}
            className={styles.groupMemberListItemLink}>
            <div className={styles.groupMemberDetails}>
              <div className={styles.leftColumn}>
                <span className={styles.emoji}>
                  <Emoji
                    ariaLabel={"group member emoji"}
                    emoji={emojiConstants.member}
                  />
                </span>
                <span className={styles.groupMemberName}>
                  {member.memberName}
                </span>
              </div>
              <div className={styles.rightColumn}>
                {/* Visually indicate negative memberBalance */}
                <div
                  className={`${styles.memberBalance} ${
                    member.memberBalance >= 0
                      ? styles.positiveBalance
                      : styles.negativeBalance
                  }`}>
                  {member.memberBalance.toFixed(2)} {groupCurrency}
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
