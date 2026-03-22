import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../../context/GroupContext";
import { useGlobalError } from "../../../context/ErrorContext";
import useDeleteResource from "../../../hooks/useDeleteResource";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

import styles from "./DeleteGroupMemberBin.module.css";

const DeleteGroupMemberBin = ({ userId, groupMemberName }) => {
  const { t } = useTranslation();
  const { refreshGroupMembers } = useGroupContext();
  const { showError } = useGlobalError();

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
      showError(hookError ? t(hookError) : t("generic-error-message"));
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
    </div>
  );
};

export default DeleteGroupMemberBin;
