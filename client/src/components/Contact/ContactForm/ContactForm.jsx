// React and Third-Party Libraries
import React, { useRef } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";

// Constants and Utils
import {
  attachFileButtonStyles,
  buttonStyles,
} from "../../../constants/stylesConstants";

// Styles
import styles from "./ContactForm.module.css";

/**
 * Component for rendering contact form
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.formData - Form data containing user input.
 * @param {Function} props.handleFileChange - Function to handle file input change.
 * @param {Function} props.handleInputChange - Function to handle input change.
 * @param {Function} props.handleFormSubmission - Function to handle form submission.
 *
 * @returns {JSX.Element} - React component. */
const ContactForm = ({
  formData,
  handleFileChange,
  handleInputChange,
  handleFormSubmission,
}) => {
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        onSubmit={handleFormSubmission}
        encType='multipart/form-data'>
        <div>
          <label htmlFor='name'>
            <strong>{t("contact-form-mandatory-name")}</strong>
          </label>
          <div>
            <input
              className={styles.inputField}
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("contact-form-required-placeholder")}
              autoFocus
            />
          </div>
        </div>
        <div>
          <label htmlFor='email'>{t("contact-form-email")}</label>
          <div>
            <input
              className={styles.inputField}
              type='text'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t("contact-form-optional-placeholder")}
            />
          </div>
        </div>
        <div>
          <label htmlFor='messageType'>{t("contact-form-type")}</label>
          <div>
            <select
              className={styles.select}
              id='messageType'
              name='messageType'
              value={formData.messageType}
              onChange={handleInputChange}>
              <option value='' disabled>
                {t("contact-form-select-message-type")}
              </option>
              <option value='issue/bug'>
                {t("contact-form-issue-bug-message-type")}
              </option>
              <option value='feedback'>
                {t("contact-form-feedback-message-type")}
              </option>
              <option value='feature request'>
                {t("contact-form-feature-request-message-type")}
              </option>
              <option value='other'>
                {t("contact-form-other-message-type")}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='feedback'>
            <strong>{t("contact-form-mandatory-message")}</strong>
          </label>
          <div>
            <textarea
              id='message'
              name='feedback'
              value={formData.feedback}
              onChange={handleInputChange}
              placeholder={
                formData.messageType === "issue/bug"
                  ? t("contact-form-message-bug/issue-placeholder")
                  : t("contact-form-required-placeholder")
              }
              rows='7'
            />
          </div>
        </div>
        {formData.messageType === "issue/bug" && (
          <div>
            <div>
              <input
                className={styles.fileInputField}
                ref={fileInputRef}
                type='file'
                name='file'
                style={{ display: "none" }}
                accept='image/*' // Accepts all image types
                onChange={handleFileChange}
              />
              <Button
                variant='outlined'
                style={attachFileButtonStyles}
                startIcon={<CloudUploadIcon />}
                onClick={handleFileUploadClick}>
                {t("contact-form-message-add-screenshot-button-text")}{" "}
              </Button>
            </div>
          </div>
        )}
        <Button
          style={buttonStyles}
          variant='contained'
          type='submit'
          endIcon={<SendIcon />}>
          {t("contact-form-message-send-button-text")}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
