import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { devLog, handleApiErrors } from "@utils/errorUtils";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import ConfirmationModal from "@components/ConfirmationModal/ConfirmationModal";
import ErrorModal from "@components/ErrorModal/ErrorModal";

import styles from "./DeleteGroupMemberBin.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const DeleteGroupMemberBin = ({
  userId,
  groupMemberName,
  incrementRerenderTrigger,
  rerenderTrigger,
}) => {
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
    setError(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/users/${userId}`);

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Group member ${userId} has been deleted.`);
        setDeletionSuccess(true);
        handleHideConfirmation();
      }
    } catch (error) {
      setIsConfirmationVisible(false);

      if (error?.response) {
        handleApiErrors(error, setError, "users", displayErrorModal, t);
      } else {
        setError(t("generic-error-message"));
        devLog(`Error deleting group member ${userId}:`, error);
        displayErrorModal();
      }
    }
  };

  useEffect(() => {
    if (deletionSuccess && rerenderTrigger) {
      setDeletionSuccess(false);
      incrementRerenderTrigger();
    }
  }, [deletionSuccess, incrementRerenderTrigger, rerenderTrigger]);

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
