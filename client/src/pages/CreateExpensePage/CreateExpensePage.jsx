import { useTranslation } from "react-i18next";

import { getActiveGroupCode } from "@/utils/localStorage";

import useFetchGroupMembers from "@hooks/useFetchGroupMembers";

import HelmetMetaTagsNetlify from "@components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "@components/PiratePx/PiratePx";
import Spinner from "@components/Spinner/Spinner";
import CreateExpense from "@components/Expenses/CreateExpense/CreateExpense";
import InAppNavigationBar from "@components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberCTA from "@components/GroupBalancesAndHistory/CreateGroupMemberCTA/CreateGroupMemberCTA";

import styles from "./CreateExpensePage.module.css";

const CreateExpensePage = () => {
  const { t } = useTranslation();
  const groupCode = getActiveGroupCode();

  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-expense-page-title")} />
      <PiratePx COUNT_IDENTIFIER='create-expense' />
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
