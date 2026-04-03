import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "../../../context/GroupContext.jsx";
import { useGlobalError } from "../../../context/ErrorContext.jsx";
import DeleteGroupMemberBin from "../DeleteGroupMemberBin/DeleteGroupMemberBin.jsx";
import Spinner from "../../Spinner/Spinner.jsx";
import Emoji from "../../Emoji/Emoji.jsx";
import emojiConstants from "../../../constants/emojiConstants.jsx";
import CLIENT_DYNAMIC_ROUTES from "../../../constants/clientDynamicRoutesConstants.js";
import styles from "./GroupMemberNames.module.css";

const { MEMBER_DETAILS } = CLIENT_DYNAMIC_ROUTES;

const GroupMemberNames = ({ isInAppGroupCreation }) => {
  const { t } = useTranslation();
  const { showError } = useGlobalError();

  const {
    groupMembers,
    activeGroupCode: groupCode,
    isFetched,
    isLoading,
    error: contextError,
    refreshGroupMembers,
  } = useGroupContext();

  const showSpinner = Boolean(isLoading || (!isFetched && groupCode));
  const hasNoMembers = !Boolean(groupMembers?.length);

  useEffect(() => {
    if (contextError) {
      showError(t(contextError));
    }
  }, [contextError, showError, t]);

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
              {groupMembers.map(({ _id, memberName }) => {
                const memberDetailsPath = MEMBER_DETAILS(groupCode, _id);

                return (
                  <li key={_id} className={styles.listItem}>
                    {!isInAppGroupCreation ? (
                      <>
                        <Link
                          to={memberDetailsPath}
                          className={`${styles.groupMemberListItemLink} ${styles.linkWrapper}`}>
                          <span className={styles.emoji}>
                            <Emoji
                              emoji={emojiConstants.member}
                              ariaLabel='group member emoji'
                            />
                          </span>
                          <span className={styles.groupMemberName}>
                            {memberName}
                          </span>
                        </Link>

                        <span className={styles.linkButton}>
                          <DeleteGroupMemberBin
                            memberId={_id}
                            groupMemberName={memberName}
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
                        <span className={styles.groupMemberName}>
                          {memberName}
                        </span>
                        <span className={styles.button}>
                          <DeleteGroupMemberBin
                            memberId={_id}
                            groupMemberName={memberName}
                            onDeleteSuccess={refreshGroupMembers}
                            isInAppGroupCreation={isInAppGroupCreation}
                          />
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupMemberNames;
