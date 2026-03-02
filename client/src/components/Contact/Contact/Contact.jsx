import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { usePWAInstall } from "react-use-pwa-install";

import useGetClientDeviceAndPwaInfo from "../../../hooks/useGetClientDeviceAndPwaInfo";
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";
import { API_URL } from "../../../constants/apiConstants";
import { TO } from "../../../constants/navigationConstants";
import ContactForm from "../ContactForm/ContactForm";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessFeedback from "../ContactForm/SuccessFeedback/SuccessFeedback";
import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

import styles from "./Contact.module.css";

const { INFO, ERROR } = LOG_LEVELS;
const { INSTANT_SPLIT } = TO;

const Contact = () => {
  const { t } = useTranslation();
  const { groupCode } = useParams();
  const navigate = useNavigate();
  const isPWAInstallPromptAvailable = usePWAInstall();
  const { isPwa, isMobile, isAndroid, isMobileSafari, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "",
    feedback: "",
  });
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (formData.messageType !== "issue/bug") {
      setFile(null);
    }

    setError("");

    if (!formData.name?.trim()) {
      setError(t("contact-form-missing-name-error"));
      displayErrorModal();
      return;
    }

    if (formData.name.length > 50) {
      setError(t("contact-form-too-long-name-error"));
      displayErrorModal();
      return;
    }

    if (!formData.feedback?.trim()) {
      setError(t("contact-form-no-message-error"));
      displayErrorModal();
      return;
    }

    if (formData.feedback.length > 2500) {
      setError(t("contact-form-message-too-long-error"));
      displayErrorModal();
      return;
    }

    if (file && file.size > 5242880) {
      setError(t("contact-form-attached-file-too-big-error"));
      displayErrorModal();
      return;
    }

    try {
      const contactData = {
        ...formData,
        groupCode,
      };

      // TODO: Refactor to a separate and better readable function
      if (formData.messageType === "issue/bug") {
        const clientInfo = `Client Information:
        - mobile: ${isMobile ? "Yes" : "No"}
        - browser: ${browserName}
        - mobile safari: ${isMobileSafari ? "Yes" : "No"}
        - iOS: ${isIOS ? "Yes" : "No"}
        - android: ${isAndroid ? "Yes" : "No"}
        - isUsingPWA: ${isPwa ? "Yes" : "No"}
        - PWAPromptAvailable: ${isPWAInstallPromptAvailable ? "Yes" : "No"}`;

        contactData.feedback += `\n\n${clientInfo}`;
      }

      if (file) {
        try {
          const fileData = new FormData();
          fileData.append("file", file);

          const responseFile = await axios.post(`${API_URL}/files`, fileData);
          debugLog("File sent:", responseFile, INFO);

          contactData.fileId = responseFile.data.savedFile._id;
        } catch (uploadError) {
          debugLog("Error uploading file:", uploadError, ERROR);
          setError(t("contact-form-upload-file-error"));
          displayErrorModal();
          return;
        }
      }

      const response = await axios.post(`${API_URL}/feedbacks`, contactData);
      debugLog("Message sent:", response, INFO);
      setShowForm(false);

      setTimeout(() => {
        navigate(INSTANT_SPLIT);
      }, 2500);
    } catch (submitError) {
      debugLog("Error creating Feedback:", submitError, ERROR);
      setError(t("generic-error-message"));
    }
  };

  return (
    <div>
      {showForm ? (
        <div className={styles.container}>
          <ContactForm
            formData={formData}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            handleFormSubmission={handleFormSubmission}
          />

          <ErrorModal
            error={error}
            onClose={handleCloseErrorModal}
            isVisible={isErrorModalVisible}
          />
        </div>
      ) : (
        <SuccessFeedback />
      )}
    </div>
  );
};

export default Contact;
