// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import Spinner from "../../components/Spinner/Spinner";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
import CreateUserCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-payment-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"create-payment"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>{t("create-payment-page-header")} </h1>
        {!isFetched ? (
          <Spinner />
        ) : // Check if there are at least 2 group members
        groupMembers.length <= 1 ? (
          <CreateUserCTA />
        ) : (
          <CreatePayment groupMembers={groupMembers} groupCode={groupCode} />
        )}
      </div>
    </main>
  );
};

export default CreatePaymentPage;
