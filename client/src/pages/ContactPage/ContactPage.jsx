// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Contact from "../../components/Contact/Contact/Contact";

// Styles
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("contact-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"contact"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("contact-page-header")}</h1>
        <Contact />
      </div>
    </main>
  );
};

export default ContactPage;
