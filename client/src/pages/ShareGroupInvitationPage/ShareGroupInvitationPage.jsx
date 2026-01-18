// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { isWebShareAPISupported } from "../../utils/clientUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Component
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ShareGroupInvitation from "../../components/ShareGroupInvitation/ShareGroupInvitation/ShareGroupInvitation";

// Styles
import styles from "./ShareGroupInvitationPage.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupInvitationPage = () => {
  const { t } = useTranslation();
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  // Making sure that page is not rendered prior to successful data fetching while also not breaking the design
  if (!isFetched) {
    return <main></main>;
  }

  // Force URL-encoded initial groupName
  const urlEncodedGroupName = encodeURIComponent(
    groupData.group.initialGroupName,
  );
  const invitationLinkDE = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;
  const invitationLinkEN = `${baseUrl}/join-en-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("share-group-invitation-page-title", {
          groupName: groupData.group.groupName,
        })}
      />
      <PiratePx COUNT_IDENTIFIER={"share-group"} />
      <InAppNavigationBar back={true} />

      {isFetched && (
        <div className={styles.container}>
          <h1>{t("share-group-invitation-page-header")}</h1>
          <ShareGroupInvitation
            groupName={groupData.group.groupName}
            invitationLinkDE={invitationLinkDE}
            invitationLinkEN={invitationLinkEN}
          />
        </div>
      )}
    </main>
  );
};

export default ShareGroupInvitationPage;
