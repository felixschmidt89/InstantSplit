import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog } from "@client-utils/errorUtils";
import emojiConstants from "@client-constants/emojiConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import Spinner from "@components/Spinner/Spinner";
import ErrorModal from "@components/ErrorModal/ErrorModal";
import Emoji from "@components/Emoji/Emoji";
import DeleteGroupMemberBin from "@components/CreateGroupMember/DeleteGroupMemberBin/DeleteGroupMemberBin";

import styles from "./RenderGroupMemberNames.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RenderGroupMemberNames = ({
  rerenderTrigger,
  groupCode,
  incrementRerenderTrigger,
  isInAppGroupCreation,
}) => {
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [groupMemberDetails, setGroupMemberDetails] = useState([]);
  const [noGroupMembers, setNoGroupMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupCode) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`,
        );
        const { users } = response.data;

        if (users?.length > 0) {
          const sortedUserDetails = users.sort(
            (userA, userB) =>
              new Date(userB.createdAt) - new Date(userA.createdAt),
          );
          setGroupMemberDetails(sortedUserDetails);
          setNoGroupMembers(false);
        } else {
          setNoGroupMembers(true);
        }

        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group users:", error);
        setError(t("generic-error-message"));
        displayErrorModal();
        setIsLoading(false);
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderTrigger, groupCode]);

  useEffect(() => {
    devLog("group members:", groupMemberDetails);
  }, [groupMemberDetails]);

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
          {noGroupMembers ? (
            <span className={styles.noGroupMembers}>
              {t("render-groupmember-names-component-no-group-members-copy")}
            </span>
          ) : (
            <ul className={styles.list}>
              {groupMemberDetails.map(({ _id, userName }) => (
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
                          incrementRerenderTrigger={incrementRerenderTrigger}
                          rerenderTrigger={rerenderTrigger}
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
                          incrementRerenderTrigger={incrementRerenderTrigger}
                          rerenderTrigger={rerenderTrigger}
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
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default RenderGroupMemberNames;
