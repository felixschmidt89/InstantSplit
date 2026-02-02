// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import JoinGroupViaInvitation from "../../components/AcceptGroupInvitationAndJoinGroup/JoinGroupViaInvitation/JoinGroupViaInvitation";

// Styles
import styles from "./JoinGroupENPage.module.css";

/**
 * Page for joining a group using English meta tags.
 * @returns {JSX.Element} React component.
 */
const JoinGroupENPage = () => {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const groupName = groupData?.group?.groupName || "";
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`InstantSplit - invitation to ${groupName}`}
        description={`Join ${groupName} to settle our shared expenses. No registration required.`}
      />
      <PiratePx COUNT_IDENTIFIER={"join-group-english-page"} />
      <div className={styles.container}>
        <InAppNavigationBar logoOnly={true} />
        {isFetched && (
          <JoinGroupViaInvitation groupCode={groupCode} groupName={groupName} />
        )}
      </div>
    </main>
  );
};
export default JoinGroupENPage;
