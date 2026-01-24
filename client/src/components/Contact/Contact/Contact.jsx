import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { usePWAInstall } from "react-use-pwa-install";

import { devLog } from "@client-utils/errorUtils";
import { ROUTES } from "@client-constants/routesConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";
import useGetClientDeviceAndPwaInfo from "@hooks/useGetClientDeviceAndPwaInfo";

import ContactForm from "@components/Contact/ContactForm/ContactForm";
import SuccessFeedback from "@components/Contact/ContactForm/SuccessFeedback/SuccessFeedback";
import ErrorModal from "@components/ErrorModal/ErrorModal";

import styles from "./Contact.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

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

          const responseFile = await axios.post(`${apiUrl}/files`, fileData);
          devLog("File sent:", responseFile);

          contactData.fileId = responseFile.data.savedFile._id;
        } catch (error) {
          devLog("Error uploading file:", error);
          setError(t("contact-form-upload-file-error"));
          displayErrorModal();
          return;
        }
      }

      const response = await axios.post(`${apiUrl}/feedbacks`, contactData);
      devLog("Message sent:", response);
      setShowForm(false);

      setTimeout(() => {
        navigate(ROUTES.INSTANT_SPLIT);
      }, 2500);
    } catch (error) {
      devLog("Error creating Feedback:", error);
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
