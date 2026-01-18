// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import SyncGroupCodeExplanation from "../../components/features/Tutorial/SyncGroupCodeExplanation/SyncGroupCodeExplanation";
import GroupBalanceAndHistoryExplanation from "../../components/features/Tutorial/GroupBalanceAndHistoryExplanation/GroupBalanceAndHistoryExplanation";
import RecommendedBrowsersExplanation from "../../components/features/Tutorial/RecommendedBrowsersExplanation/RecommendedBrowsersExplanation";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("tutorial-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"tutorial"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("tutorial-page-header")}</h1>
        {!isFetched ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.section}>
              <RecommendedBrowsersExplanation />
            </div>
            <div className={styles.section}>
              <GroupCodeExplanation
                initialGroupName={groupData.group.initialGroupName}
                groupCode={groupCode}
              />
            </div>
            <div className={styles.section}>
              <GroupBalanceAndHistoryExplanation />
            </div>
            <SyncGroupCodeExplanation />
          </>
        )}
      </div>
    </main>
  );
}

export default TutorialPage;
