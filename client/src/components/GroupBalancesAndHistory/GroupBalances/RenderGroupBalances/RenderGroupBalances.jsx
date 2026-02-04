import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { devLog } from "@client-utils/errorUtils";
import { BALANCE_THRESHOLD } from "@client-constants/dataConstants";

import useErrorModalVisibility from "@hooks/useErrorModalVisibility";

import Spinner from "@components/Spinner/Spinner";
import NotEnoughGroupMembers from "@components/GroupBalancesAndHistory/NotEnoughGroupMembers/NotEnoughGroupMembers";
import ErrorModal from "@components/ErrorModal/ErrorModal";
import RenderGroupMemberBalance from "@components/GroupBalancesAndHistory/GroupBalances/RenderGroupMemberBalance/RenderGroupMemberBalance";

import styles from "./RenderGroupBalances.module.css";
import { getActiveGroupCode } from "@/utils/localStorage/index.js";

import { API_URL } from "@client-constants/apiConstants";

const RenderGroupBalances = ({ groupCurrency }) => {
  const { t } = useTranslation();
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();
  const [groupMemberDetails, setGroupMemberDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const groupCode = getActiveGroupCode();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/byGroupCode/${groupCode}`,
        );
        const { users } = response.data;
        devLog("User details fetched:", response);

        if (users?.length > 0) {
          const formattedDetails = users.map((user) => {
            const isNoEdgeCase =
              users.length > 1 &&
              users.every(
                (u) => Math.abs(u.userBalance) <= BALANCE_THRESHOLD,
              ) &&
              Math.abs(user.userBalance) <=
                (users.length - 1) * BALANCE_THRESHOLD;

            devLog("isNoEdgeCase:", isNoEdgeCase);

            return {
              userId: user._id,
              userName: user.userName,
              userBalance:
                Math.abs(user.userBalance) <= BALANCE_THRESHOLD && isNoEdgeCase
                  ? 0
                  : +parseFloat(user.userBalance).toFixed(2),
            };
          });

          setGroupMemberDetails(formattedDetails);
          devLog("Group details formatted:", formattedDetails);
        }

        setError("");
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching user details:", error);
        setError(t("generic-error-message"));
        displayErrorModal();
        setIsLoading(false);
      }
    };

    if (groupCode) {
      fetchUserDetails();
    }
  }, [groupCode, t]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {groupMemberDetails?.length > 0 ? (
        <RenderGroupMemberBalance
          groupMemberDetails={groupMemberDetails}
          groupCode={groupCode}
          groupCurrency={groupCurrency}
        />
      ) : (
        <span className={styles.issue}>
          <NotEnoughGroupMembers />
        </span>
      )}

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default RenderGroupBalances;
