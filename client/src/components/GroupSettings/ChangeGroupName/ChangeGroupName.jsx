import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import useEditPenVisibility from "../../../hooks/useEditPenVisibility";
import EditPenButton from "../../EditPenButton/EditPenButton";
import ChangeResourceName from "../../ChangeResourceName/ChangeResourceName";

import styles from "./ChangeGroupName.module.css";

const ChangeGroupName = ({ groupData, groupCode }) => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const [groupName, setGroupName] = useState(groupData.group.groupName);

  const { showEdit, handleIconClick, handleChange } = useEditPenVisibility(
    containerRef,
    setGroupName,
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.header}>{t("change-group-name")}</h2>

      {showEdit ? (
        <div className={styles.editContainer}>
          <ChangeResourceName
            resourceId={groupData.group._id}
            groupCode={groupCode}
            resourceType='group'
            resourceName={groupName}
            enableRedirect={false}
            callback={handleChange}
          />
        </div>
      ) : (
        <div className={styles.groupNameContainer}>
          <span className={styles.groupName}>{groupName}</span>
          <span className={styles.icon}>
            <EditPenButton handleIconClick={handleIconClick} scale={1.4} />
          </span>
        </div>
      )}
    </div>
  );
};

export default ChangeGroupName;
