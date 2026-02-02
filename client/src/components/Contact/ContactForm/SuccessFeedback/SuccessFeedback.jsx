// React and Third-Party Libraries
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./SuccessFeedback.module.css";

const SuccessFeedback = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.onSuccess}>
      <div className={styles.icon}>
        <IoMdCheckmarkCircleOutline />
      </div>
      <p className={styles.text}>
        {t("contact-form-success-feedback")}
        <br />
        {t("contact-form-redirect-to-main-app-copy")}
      </p>
    </div>
  );
};

export default SuccessFeedback;
