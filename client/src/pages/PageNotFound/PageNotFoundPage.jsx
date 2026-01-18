// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import Emoji from "../../components/Emoji/Emoji";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";

// Styles
import styles from "./PageNotFoundPage.module.css";

function PageNotFoundPage() {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("page-not-found-page-title")} />
      <InAppNavigationBar logoOnly={true} />
      <h1 className={styles.pageNotFoundHeader}>
        <Emoji ariaLabel={"error emoji"} emoji={emojiConstants.error}></Emoji>
        {t("page-not-found-page-header")}
      </h1>
      <div className={styles.container}>
        <PiratePx COUNT_IDENTIFIER={"page-not-found"} />
        <div className={styles.pageNotFoundText}>
          <p>{t("page-not-found-page-explanation")}</p>
          <span className={styles.goToMainButton}>
            <RouteButton
              route={`instant-split`}
              buttonText='go to main'
              margin='0px'
            />
          </span>
        </div>
      </div>
    </main>
  );
}

export default PageNotFoundPage;
