import { useTranslation } from "react-i18next";

import emojiConstants from "../../constants/emojiConstants";
import TO from "../../constants/clientRouteLinks.js";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";

import styles from "./PageNotFoundPage.module.css";
import Emoji from "../../components/Emoji/Emoji.jsx";

const { INSTANT_SPLIT } = TO.STATIC;

const PageNotFoundPage = () => {
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
        <div className={styles.pageNotFoundText}>
          <p>{t("page-not-found-page-explanation")}</p>
          <span className={styles.goToMainButton}>
            <RouteButton
              route={INSTANT_SPLIT}
              buttonText={t("page-not-found-go-to-main-button-text")}
              margin='0px'
            />
          </span>
        </div>
      </div>
    </main>
  );
};

export default PageNotFoundPage;
