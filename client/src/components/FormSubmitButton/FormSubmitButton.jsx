// React and Third-Party Libraries
import React from "react";

// Components
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

// Styles
import styles from "./FormSubmitButton.module.css";

/**
 * FormSubmitButton component.
 * @param {Object} props - Component props.
 * @param {boolean} props.add - If true, renders plus icon.
 * @param {boolean} props.submit - If true, renders send icon.
 * @param {string} props.fontSize - Font size of the icon in rem unit. Defaults to '1.6'.
 * @param {string} props.marginTop - Margin-top of the button in rem unit. Defaults to '0'.
 * @param {string} props.marginRight - Margin-right of the button in rem unit. Defaults to '0'.
 * @param {string} props.marginLeft - Margin-left of the button in rem unit. Defaults to '0'.
 * @param {string} props.translateX - Horizontal translation of the button in rem unit. Defaults to '0'.
 * @param {string} props.translateY - Vertical translation of the button in rem unit. Defaults to '0'.
 * @param {string} props.transformScale - Scale factor of the button. Defaults to '1'.
 * @returns {JSX.Element} React component.
 */
const FormSubmitButton = ({
  add = false,
  submit = false,
  fontSize = "1.6",
  marginTop = "0",
  marginRight = "0",
  marginLeft = "0",
  translateX = "0",
  translateY = "0",
  transformScale = "1",
}) => {
  const iconStyle = {
    fontSize: `${fontSize}rem`,
    marginTop: `${marginTop}rem`,
    marginRight: `${marginRight}rem`,
    marginLeft: `${marginLeft}rem`,
    transform: `translate(${translateX}rem, ${translateY}rem) scale(${transformScale})`,
  };

  return (
    <button
      className={`${styles.button} ${
        add ? styles.add : submit ? styles.submit : ""
      }`}
      style={iconStyle}
      type='submit'>
      {add && <IoAddCircleOutline style={iconStyle} />}
      {submit && <IoMdSend style={iconStyle} />}
    </button>
  );
};

export default FormSubmitButton;
