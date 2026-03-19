import { useMemo } from "react";

import styles from "./RenderGroupBalances.module.css";
import { useGroupContext } from "../../../../context/GroupContext";
import { BALANCE_THRESHOLD } from "../../../../constants/dataConstants";
import RenderGroupMemberBalance from "../RenderGroupMemberBalance/RenderGroupMemberBalance";
import Spinner from "../../../Spinner/Spinner";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers";
import ErrorModal from "../../../ErrorModal/ErrorModal";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility.jsx";
import { LOG_LEVELS } from "../../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../../shared/utils/debug/debugLog.js";

const { DEBUG } = LOG_LEVELS;

const RenderGroupBalances = ({ groupCurrency }) => {
  const { isErrorModalVisible, handleCloseErrorModal } =
    useErrorModalVisibility();

  const {
    activeGroupCode: groupCode,
    groupMembers,
    isLoading,
    error,
  } = useGroupContext();

  const groupMemberDetails = useMemo(() => {
    if (!groupMembers || groupMembers.length === 0) return [];

    return groupMembers.map((user) => {
      // TODO: Refactor and move this calculation to the backend or a utility helper
      const isNoEdgeCase =
        groupMembers.length > 1 &&
        groupMembers.every(
          (member) => Math.abs(member.userBalance) <= BALANCE_THRESHOLD,
        ) &&
        Math.abs(user.userBalance) <=
          (groupMembers.length - 1) * BALANCE_THRESHOLD;

      debugLog(
        "Balance Edge Case Check",
        { userName: user.userName, isNoEdgeCase },
        DEBUG,
      );

      return {
        userId: user._id,
        userName: user.userName,
        userBalance:
          Math.abs(user.userBalance) <= BALANCE_THRESHOLD && isNoEdgeCase
            ? 0
            : +parseFloat(user.userBalance).toFixed(2),
      };
    });
  }, [groupMembers]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {groupMemberDetails.length > 0 ? (
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
        isVisible={isErrorModalVisible || !!error}
      />
    </div>
  );
};

export default RenderGroupBalances;
