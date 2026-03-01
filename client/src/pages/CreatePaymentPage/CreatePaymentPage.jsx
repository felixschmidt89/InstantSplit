import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../context/GroupContext";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
import Spinner from "../../components/Spinner/Spinner.jsx";

import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  const { t } = useTranslation();

  const {
    activeGroupCode,
    groupMembers,
    isFetched: isMembersFetched,
  } = useGroupContext();

  const isPageLoading = !isMembersFetched;
  const hasSufficientMembers = groupMembers?.length > 1;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-payment-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-payment-page-header")}</h1>

        {isPageLoading ? (
          <Spinner />
        ) : hasSufficientMembers ? (
          <CreatePayment
            groupMembers={groupMembers}
            groupCode={activeGroupCode}
          />
        ) : (
          <CreateGroupMemberCTA />
        )}
      </div>
    </main>
  );
};

export default CreatePaymentPage;
