// React and Third-Party Libraries
import React from "react";
import { MdEdit } from "react-icons/md";

// Styles
import styles from "./EditPenButton.module.css";

const EditPenButton = ({ handleIconClick, scale }) => {
  const iconStyle = {
    transform: `scale(${scale})`,
  };

  return (
    <MdEdit
      onClick={handleIconClick}
      role='button'
      className={styles.icon}
      style={iconStyle}
    />
  );
};

export default EditPenButton;
