import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useEditPenVisibility from "../../../hooks/useEditPenVisibility";

// Components
import EditPenButton from "../../EditPenButton/EditPenButton";
import ChangeResourceName from "../../ChangeResourceName/ChangeResourceName";

// Styles
import styles from "./ChangeGroupName.module.css";

/**
 * ChangeGroupName component for updating group name.
 * @param {Object} props - Component props.
 * @param {Object} props.groupData - Data of the group.
 * @param {string} props.groupCode - The code identifying the group.
 * @returns {JSX.Element} React component.
 */
const ChangeGroupName = ({ groupData, groupCode }) => {
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState({
    editGroupName: groupData.group.groupName,
    storedGroupName: groupData.group.groupName,
  });

  const { showEdit, handleIconClick, handleChange } = useEditPenVisibility(
    containerRef,
    setGroupName,
  );

  const handleGroupNameChange = (newGroupName) => {
    setGroupName((prevState) => ({
      ...prevState,
      editGroupName: newGroupName,
    }));
    handleChange((prevState) => ({
      ...prevState,
      storedGroupName: newGroupName,
    }));
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.header}>{t("change-group-name")}</h2>
      {showEdit ? (
        <div className={styles.editContainer}>
          <ChangeResourceName
            resourceId={groupData.group._id}
            groupCode={groupCode}
            resourceType={"group"}
            resourceName={groupName.storedGroupName}
            navigateToMain={false}
            callback={handleGroupNameChange}
          />
        </div>
      ) : (
        <div className={styles.groupNameContainer}>
          <span className={styles.groupName}>{groupName.storedGroupName}</span>
          <span className={styles.icon}>
            <EditPenButton handleIconClick={handleIconClick} scale={1.4} />
          </span>
        </div>
      )}
    </div>
  );
};

export default ChangeGroupName;
