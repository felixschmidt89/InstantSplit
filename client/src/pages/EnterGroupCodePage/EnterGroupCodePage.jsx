// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ValidateGroupCode from "../../components/features/ManageGroups/ValidateGroupCode/ValidateGroupCode";

// Styles
import style from "./EnterGroupCodePage.module.css";

const EnterGroupCodePage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("enter-groupcode-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"onboarding-enter-groupcode"} />
      <InAppNavigationBar back={true} backRoute='/' />
      <div className={style.container}>
        <ValidateGroupCode />
      </div>
    </main>
  );
};

export default EnterGroupCodePage;
