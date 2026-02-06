import { useTranslation } from "react-i18next";

import styles from "./CreateExpensePage.module.css";
import { getActiveGroupCode } from "../../utils/localStorage";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/Spinner/Spinner";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreateExpense from "../../components/Expenses/CreateExpense/CreateExpense";

import {
  GroupMembersProvider,
  useGroupMembersContext,
} from "../../context/GroupMembersContext";

const CreateExpenseContent = ({ groupCode }) => {
  const { groupMembers, isFetched } = useGroupMembersContext();

  if (!isFetched) {
    return <Spinner />;
  }

  if (groupMembers?.length <= 1) {
    return <CreateGroupMemberCTA isPayment={false} />;
  }

  return <CreateExpense groupCode={groupCode} />;
};

const CreateExpensePage = () => {
  const { t } = useTranslation();
  const groupCode = getActiveGroupCode();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-expense-page-header")}</h1>

        <GroupMembersProvider groupCode={groupCode}>
          <CreateExpenseContent groupCode={groupCode} />
        </GroupMembersProvider>
      </div>
    </main>
  );
};

export default CreateExpensePage;
