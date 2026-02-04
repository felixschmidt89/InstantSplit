import { useTranslation } from "react-i18next";

import styles from "./CreateExpensePage.module.css";
import { getActiveGroupCode } from "../../utils/localStorage";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/Spinner/Spinner";
import CreateGroupMemberCTA from "../../components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";
import CreateExpense from "../../components/Expenses/CreateExpense/CreateExpense";

const CreateExpensePage = () => {
  const { t } = useTranslation();
  const groupCode = getActiveGroupCode();

  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <h1>{t("create-expense-page-header")}</h1>

        {!isFetched && <Spinner />}

        {isFetched &&
          (groupMembers?.length <= 1 ? (
            <CreateGroupMemberCTA isPayment={false} />
          ) : (
            <CreateExpense groupMembers={groupMembers} groupCode={groupCode} />
          ))}
      </div>
    </main>
  );
};

export default CreateExpensePage;
