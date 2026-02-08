import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./RenderGroupMemberNames.module.css";
import emojiConstants from "../../../constants/emojiConstants";
import DeleteGroupMemberBin from "../DeleteGroupMemberBin/DeleteGroupMemberBin";
import Spinner from "../../Spinner/Spinner";
import Emoji from "../../Emoji/Emoji";
import ErrorModal from "../../ErrorModal/ErrorModal";

import { useGroupMembersContext } from "../../../context/GroupMembersContext";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";

const RenderGroupMemberNames = ({ isInAppGroupCreation }) => {
  const { t } = useTranslation();

  const { groupMembers, groupCode, isLoading, error, refreshGroupMembers } =
    useGroupMembersContext();

  const { isErrorModalVisible, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Memoize the sorted list to avoid re-sorting on every render
  // unless the members array actually changes
  const sortedMembers = useMemo(() => {
    return [...groupMembers].sort(
      (userA, userB) => new Date(userB.createdAt) - new Date(userA.createdAt),
    );
  }, [groupMembers]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.membersContainer}>
        <h2 className={styles.groupMemberHeader}>
          {t("render-groupmember-names-component-header")}
        </h2>

        <div className={styles.members}>
          {sortedMembers.length === 0 ? (
            <span className={styles.noGroupMembers}>
              {t("render-groupmember-names-component-no-group-members-copy")}
            </span>
          ) : (
            <ul className={styles.list}>
              {sortedMembers.map(({ _id, userName }) => (
                <li key={_id} className={styles.listItem}>
                  {!isInAppGroupCreation ? (
                    <>
                      <Link
                        to={`/groupmember-details/${groupCode}/${_id}`}
                        className={`${styles.groupMemberListItemLink} ${styles.linkWrapper}`}>
                        <span className={styles.emoji}>
                          <Emoji
                            emoji={emojiConstants.member}
                            ariaLabel='group member emoji'
                          />
                        </span>
                        <span className={styles.groupMemberName}>
                          {userName}
                        </span>
                      </Link>

                      <span className={styles.linkButton}>
                        <DeleteGroupMemberBin
                          userId={_id}
                          groupMemberName={userName}
                          onDeleteSuccess={refreshGroupMembers}
                          isInAppGroupCreation={isInAppGroupCreation}
                        />
                      </span>
                    </>
                  ) : (
                    <div className={styles.groupMemberListItem}>
                      <span className={styles.emoji}>
                        <Emoji
                          emoji={emojiConstants.member}
                          ariaLabel='group member emoji'
                        />
                      </span>
                      <span className={styles.groupMemberName}>{userName}</span>
                      <span className={styles.button}>
                        <DeleteGroupMemberBin
                          userId={_id}
                          groupMemberName={userName}
                          onDeleteSuccess={refreshGroupMembers}
                          isInAppGroupCreation={isInAppGroupCreation}
                        />
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible || !!error}
      />
    </div>
  );
};

export default RenderGroupMemberNames;
