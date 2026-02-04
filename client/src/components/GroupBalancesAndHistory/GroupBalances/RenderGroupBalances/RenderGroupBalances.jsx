import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import styles from "./RenderGroupBalances.module.css";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import { getActiveGroupCode } from "../../../../utils/localStorage";
import { devLog } from "../../../../utils/errorUtils";
import { BALANCE_THRESHOLD } from "../../../../constants/dataConstants";
import RenderGroupMemberBalance from "../RenderGroupMemberBalance/RenderGroupMemberBalance";
import Spinner from "../../../Spinner/Spinner";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers";
import PiratePx from "../../../PiratePx/PiratePx";
import ErrorModal from "../../../ErrorModal/ErrorModal";
import { fetchGroupMembers } from "../../../../api/users/fetchGroupMembers.js";

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
        const { users } = await fetchGroupMembers(groupCode);
        devLog("User details fetched:", users);

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

      <PiratePx COUNT_IDENTIFIER='group-balances' />

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default RenderGroupBalances;
