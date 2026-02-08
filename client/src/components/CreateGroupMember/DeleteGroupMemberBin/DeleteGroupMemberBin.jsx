import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import styles from "./DeleteGroupMemberBin.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { devLog, handleApiErrors } from "../../../utils/errorUtils";
import { useGroupMembersContext } from "../../../context/GroupMembersContext";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import ErrorModal from "../../ErrorModal/ErrorModal";

import { deleteGroupMember } from "../../../api/users/deleteGroupMember";

const DeleteGroupMemberBin = ({ userId, groupMemberName }) => {
  const { t } = useTranslation();
  const { refreshGroupMembers } = useGroupMembersContext();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleShowConfirmation = () => setIsConfirmationVisible(true);
  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
    setError(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteGroupMember(userId);

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Group member ${userId} has been deleted.`);
        handleHideConfirmation();

        if (refreshGroupMembers) {
          await refreshGroupMembers();
        }
      }
    } catch (error) {
      setIsConfirmationVisible(false);

      if (error?.response) {
        handleApiErrors(error, setError, "users", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        displayErrorModal();
      }
    }
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.link}
        onClick={handleShowConfirmation}
        role='button'>
        <MdDelete />
      </span>

      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("delete-group-member-bin-component-confirmation-message", {
            groupMemberName,
          })}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={error}
        />
      )}

      <ErrorModal
        error={error && t(error)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default DeleteGroupMemberBin;
