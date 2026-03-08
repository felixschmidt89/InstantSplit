import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../../context/GroupContext.jsx";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility.jsx";
import DeleteGroupMemberBin from "../DeleteGroupMemberBin/DeleteGroupMemberBin.jsx";
import Spinner from "../../Spinner/Spinner.jsx";
import Emoji from "../../Emoji/Emoji.jsx";
import ErrorModal from "../../ErrorModal/ErrorModal.jsx";

import styles from "./GroupMemberNames.module.css";
import emojiConstants from "../../../constants/emojiConstants.jsx";
import { CLIENT_LINKS } from "../../../constants/clientDynamicRoutesConstants.js";

const { MEMBER_DETAILS } = CLIENT_LINKS;

const GroupMemberNames = ({ isInAppGroupCreation }) => {
  const { t } = useTranslation();

  const {
    groupMembers,
    activeGroupCode: groupCode,
    isFetched,
    isLoading,
    error,
    refreshGroupMembers,
  } = useGroupContext();

  const { isErrorModalVisible, handleCloseErrorModal } =
    useErrorModalVisibility();

  const showSpinner = isLoading || (!isFetched && groupCode);

  // TODO: Move to backend
  const sortedMembers = useMemo(() => {
    return groupMembers
      ? [...groupMembers].sort(
          (userA, userB) =>
            new Date(userB.createdAt) - new Date(userA.createdAt),
        )
      : [];
  }, [groupMembers]);

  // TODO: Move to backend
  const hasNoMembers = sortedMembers.length === 0;
  const shouldShowErrorModal = Boolean(isErrorModalVisible || error);

  if (showSpinner) {
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
          {hasNoMembers ? (
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
                        to={MEMBER_DETAILS(groupCode, _id)}
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
        isVisible={shouldShowErrorModal}
      />
    </div>
  );
};

export default GroupMemberNames;
