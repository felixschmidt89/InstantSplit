import React from "react";
import { useTranslation } from "react-i18next";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InstantSplitIntroSection from "../../components/Home/InstantSplitIntroSection/InstantSplitIntroSection";
import GetStartedSection from "../../components/Home/GetStartedSection/GetStartedSection";
import TermsAndConditionsSection from "../../components/Home/TermsAndConditionsSection/TermsAndConditionsSection";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import styles from "./HomePage.module.css";
import useAutoActiveGroupCodeRedirect from "../../hooks/useAutoActiveGroupCodeRedirect";

const HomePage = () => {
  useAutoActiveGroupCodeRedirect();
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("home-page-title")} />
      <InAppNavigationBar logoOnly />
      <div className={styles.container}>
        <h1 className={styles.homepageHeader}>{t("home-page-header")}</h1>
        <InstantSplitIntroSection />
        <GetStartedSection />
        <TermsAndConditionsSection />
      </div>
    </main>
  );
};

export default HomePage;
