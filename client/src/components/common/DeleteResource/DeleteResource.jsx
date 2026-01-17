import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../../constants/stylesConstants";
import useDeleteResource from "../../../hooks/useDeleteResource";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { ROUTES } from "../../../constants/routesConstants";
import styles from "./DeleteResource.module.css";

const DeleteResource = ({
  resourceId,
  resourceType,
  route = ROUTES.INSTANT_SPLIT,
  isButton = true,
  navigateOnDelete = true,
  showResourceType = true,
  onDeleteResource,
}) => {
  const { t } = useTranslation();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { deleteResource, error: hookError } = useDeleteResource(
    resourceType,
    resourceId,
    navigateOnDelete ? route : null,
  );

  useEffect(() => {
    if (hookError) {
      // TODO: Make this transformation a proper utility function
      const transformedError = `delete-resource-error-${hookError
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replaceAll(" ", "-")}`;
      setLocalError(transformedError);
    } else {
      setLocalError(null);
    }
  }, [hookError]);

  const handleDelete = () => {
    deleteResource();
    onDeleteResource?.(resourceId);
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className={styles.container}>
      {isButton ? (
        <Button
          onClick={handleShowConfirmation}
          style={buttonStyles}
          color='error'
          variant='outlined'
          type='submit'
          endIcon={<DeleteIcon />}>
          {t("delete-resource-delete-copy")}
        </Button>
      ) : (
        <span
          className={styles.link}
          onClick={handleShowConfirmation}
          role='button'>
          {t("delete-resource-delete-copy")}
        </span>
      )}

      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("delete-resource-confirmation-message")}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={localError && t(localError)}
        />
      )}
    </div>
  );
};

export default DeleteResource;
