import { useRef, useState } from "react";
import { useGroupContext } from "../../../context/GroupContext";
import useEditPenVisibility from "../../../hooks/useEditPenVisibility";
import ChangeResourceName from "../../ChangeResourceName/ChangeResourceName";
import EditPenButton from "../../EditPenButton/EditPenButton";

// Assuming you have MEMBER in your RESOURCE_TYPES now
import { RESOURCE_TYPES } from "../../../../../shared/constants/domain/resourceConstants.js";

import styles from "./GroupMemberName.module.css";

// FIX: Change USER to MEMBER
const { MEMBER } = RESOURCE_TYPES;

const GroupMemberName = ({ memberId }) => {
  const containerRef = useRef(null);

  const { getMemberName, activeGroupCode, refreshGroupMembers } =
    useGroupContext();

  const [optimisticName, setOptimisticName] = useState(null);

  const { showEdit, handleIconClick, handleChange } = useEditPenVisibility(
    containerRef,
    setOptimisticName,
  );

  const handleNameUpdateSuccess = async (newName) => {
    handleChange(newName);
    await refreshGroupMembers();
  };

  // FIX: Use memberId to look up the name
  const fetchedName = getMemberName(memberId);
  const displayName = optimisticName ?? fetchedName;

  return (
    <div className={styles.container} ref={containerRef}>
      {showEdit ? (
        <div className={styles.changeName}>
          <ChangeResourceName
            resourceId={memberId}
            resourceType={MEMBER}
            resourceName={displayName}
            groupCode={activeGroupCode}
            inputWidth={20}
            enableRedirect={false}
            callback={handleNameUpdateSuccess}
          />
        </div>
      ) : (
        <h1 className={styles.groupMemberName}>
          {displayName}
          <span className={styles.icon}>
            <EditPenButton handleIconClick={handleIconClick} scale={1.1} />
          </span>
        </h1>
      )}
    </div>
  );
};

export default GroupMemberName;
