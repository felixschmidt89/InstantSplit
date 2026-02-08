import { useTranslation } from "react-i18next";
import styles from "./CreateExpensePage.module.css";
import { useGroupContext } from "../../context/GroupContext";
import { useGroupMembersContext } from "../../context/GroupMembersContext";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/Spinner/Spinner";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreateExpense from "../../components/Expenses/CreateExpense/CreateExpense";

const CreateExpensePage = () => {
  const { t } = useTranslation();

  const { activeGroupCode } = useGroupContext();

  const { groupMembers, isFetched } = useGroupMembersContext();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-expense-page-header")}</h1>

        {!isFetched ? (
          <Spinner />
        ) : groupMembers?.length <= 1 ? (
          <CreateGroupMemberCTA isPayment={false} />
        ) : (
          <CreateExpense groupCode={activeGroupCode} />
        )}
      </div>
    </main>
  );
};

export default CreateExpensePage;
