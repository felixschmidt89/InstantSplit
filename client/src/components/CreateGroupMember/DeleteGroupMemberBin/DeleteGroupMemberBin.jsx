import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../../context/GroupContext";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import useDeleteResource from "../../../hooks/useDeleteResource";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import ErrorModal from "../../ErrorModal/ErrorModal";

import styles from "./DeleteGroupMemberBin.module.css";

const DeleteGroupMemberBin = ({ userId, groupMemberName }) => {
  const { t } = useTranslation();
  const { refreshGroupMembers } = useGroupContext();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);

  const { deleteResource, error: hookError } = useDeleteResource(
    "users",
    userId,
    null,
    refreshGroupMembers,
  );

  const handleShowConfirmation = () => setShouldShowConfirmationModal(true);
  const handleHideConfirmation = () => setShouldShowConfirmationModal(false);

  const handleDelete = async () => {
    try {
      await deleteResource();
      handleHideConfirmation();
    } catch (error) {
      setShouldShowConfirmationModal(false);
      displayErrorModal();
    }
  };

  const hasHookError = Boolean(hookError);

  return (
    <div className={styles.container}>
      <span
        className={styles.link}
        onClick={handleShowConfirmation}
        role='button'>
        <MdDelete />
      </span>

      {shouldShowConfirmationModal && (
        <ConfirmationModal
          message={t("delete-group-member-bin-component-confirmation-message", {
            groupMemberName,
          })}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={shouldShowConfirmationModal}
          error={hookError}
        />
      )}

      <ErrorModal
        error={hasHookError && t(hookError)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default DeleteGroupMemberBin;
