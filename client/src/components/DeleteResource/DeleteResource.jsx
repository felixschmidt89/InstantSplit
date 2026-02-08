import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../constants/stylesConstants";
import useDeleteResource from "../../hooks/useDeleteResource";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./DeleteResource.module.css";

const DeleteResource = ({
  resourceId,
  resourceType,
  route = ROUTES.INSTANT_SPLIT,
  isButton = true,
  navigateOnDelete = true,
  onDeleteResource,
}) => {
  const { t } = useTranslation();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [localError, setLocalError] = useState(null);

  const redirectPath = navigateOnDelete ? route : undefined;

  const { deleteResource, error: hookError } = useDeleteResource(
    resourceType,
    resourceId,
    redirectPath,
  );

  useEffect(() => {
    if (hookError) {
      const transformedError = `delete-resource-error-${hookError
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replaceAll(" ", "-")}`;
      setLocalError(transformedError);
    } else {
      setLocalError(null);
    }
  }, [hookError]);

  const handleDelete = async () => {
    try {
      await deleteResource();

      setIsConfirmationVisible(false);

      if (onDeleteResource) {
        await onDeleteResource();
      }
    } catch (err) {
      // Error handled by hook
    }
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
          type='button'
          endIcon={<DeleteIcon />}>
          {t("delete-resource-delete-copy")}
        </Button>
      ) : (
        <span
          className={styles.link}
          onClick={handleShowConfirmation}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleShowConfirmation()}>
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
