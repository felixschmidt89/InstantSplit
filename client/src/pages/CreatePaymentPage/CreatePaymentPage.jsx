import { useTranslation } from "react-i18next";

import { getActiveGroupCode } from "@/utils/localStorage/index.js";

import useFetchGroupMembers from "@hooks/useFetchGroupMembers";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "@components/PiratePx/PiratePx";
import Spinner from "@components/Spinner/Spinner";
import CreatePayment from "@components/Payments/CreatePayment/CreatePayment";
import CreateGroupMemberCTA from "@components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  const { t } = useTranslation();

  const groupCode = getActiveGroupCode();

  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-payment-page-title")} />
      <PiratePx COUNT_IDENTIFIER='create-payment' />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-payment-page-header")}</h1>

        {!isFetched && <Spinner />}

        {isFetched &&
          (groupMembers?.length <= 1 ? (
            <CreateGroupMemberCTA />
          ) : (
            <CreatePayment groupMembers={groupMembers} groupCode={groupCode} />
          ))}
      </div>
    </main>
  );
};

export default CreatePaymentPage;
