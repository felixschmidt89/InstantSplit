import { useTranslation } from "react-i18next";
import styles from "./CreatePaymentPage.module.css";
import { useGroupContext } from "../../context/GroupContext";
import { useGroupMembersContext } from "../../context/GroupMembersContext";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
import Spinner from "../../components/Spinner/Spinner.jsx";

const CreatePaymentPage = () => {
  const { t } = useTranslation();

  const { activeGroupCode } = useGroupContext();

  const { groupMembers, isFetched } = useGroupMembersContext();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-payment-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-payment-page-header")}</h1>

        {!isFetched ? (
          <Spinner />
        ) : groupMembers?.length <= 1 ? (
          <CreateGroupMemberCTA />
        ) : (
          <CreatePayment
            groupMembers={groupMembers}
            groupCode={activeGroupCode}
          />
        )}
      </div>
    </main>
  );
};

export default CreatePaymentPage;
