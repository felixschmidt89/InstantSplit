import { useTranslation } from "react-i18next";

import { useGroupContext } from "../../context/GroupContext";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/Spinner/Spinner";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreateExpense from "../../components/Expenses/CreateExpense/CreateExpense";

import styles from "./CreateExpensePage.module.css";

const CreateExpensePage = () => {
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
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-expense-page-header")}</h1>

        {isPageLoading ? (
          <Spinner />
        ) : hasSufficientMembers ? (
          <CreateExpense groupCode={activeGroupCode} />
        ) : (
          <CreateGroupMemberCTA isPayment={false} />
        )}
      </div>
    </main>
  );
};

export default CreateExpensePage;
