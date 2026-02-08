import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import styles from "./DeleteGroupMemberBin.module.css";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import useDeleteResource from "../../../hooks/useDeleteResource";
import { useGroupMembersContext } from "../../../context/GroupMembersContext";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import ErrorModal from "../../ErrorModal/ErrorModal";

const DeleteGroupMemberBin = ({ userId, groupMemberName }) => {
  const { t } = useTranslation();
  const { refreshGroupMembers } = useGroupMembersContext();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const { deleteResource, error: hookError } = useDeleteResource(
    "users",
    userId,
    null,
    refreshGroupMembers,
  );

  const handleShowConfirmation = () => setIsConfirmationVisible(true);
  const handleHideConfirmation = () => setIsConfirmationVisible(false);

  const handleDelete = async () => {
    try {
      await deleteResource();
      handleHideConfirmation();
    } catch (err) {
      setIsConfirmationVisible(false);
      displayErrorModal();
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
          error={hookError}
        />
      )}

      <ErrorModal
        error={hookError && t(hookError)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default DeleteGroupMemberBin;
