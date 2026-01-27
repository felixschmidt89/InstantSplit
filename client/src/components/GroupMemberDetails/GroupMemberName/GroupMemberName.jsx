import React, { useState, useEffect, useRef } from "react";
import styles from "./GroupMemberName.module.css";
import ChangeResourceName from "../../ChangeResourceName/ChangeResourceName";
import useFetchGroupMemberData from "../../../hooks/useFetchGroupMemberData";
import EditPenButton from "../../EditPenButton/EditPenButton";
import useEditPenVisibility from "../../../hooks/useEditPenVisibility";

const GroupMemberName = ({ userId, groupCode }) => {
  const { groupMemberData, isFetched: groupMemberDataIsFetched } =
    useFetchGroupMemberData(userId);
  const [groupMemberName, setGroupMemberName] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (groupMemberDataIsFetched) {
      setGroupMemberName(groupMemberData?.userName || "");
    }
  }, [groupMemberDataIsFetched, groupMemberData]);

  const { showEdit, handleIconClick, handleChange } = useEditPenVisibility(
    containerRef,
    setGroupMemberName,
  );

  return (
    <div className={styles.container} ref={containerRef}>
      {groupMemberDataIsFetched && (
        <>
          {showEdit ? (
            <div className={styles.changeName}>
              <ChangeResourceName
                resourceId={userId}
                resourceType='user'
                resourceName={groupMemberName}
                groupCode={groupCode}
                inputWidth={20}
                navigateToMain={false}
                callback={handleChange}
              />
            </div>
          ) : (
            <h1 className={styles.groupMemberName}>
              {groupMemberName}{" "}
              <span className={styles.icon}>
                <EditPenButton handleIconClick={handleIconClick} scale={1.1} />
              </span>
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default GroupMemberName;
