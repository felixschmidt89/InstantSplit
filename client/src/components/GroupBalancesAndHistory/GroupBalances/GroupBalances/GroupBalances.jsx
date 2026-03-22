import { useMemo, useEffect } from "react";

import styles from "./GroupBalances.module.css";
import { useGroupContext } from "../../../../context/GroupContext.jsx";
import { useGlobalError } from "../../../../context/ErrorContext.jsx";
import GroupMemberBalance from "../GroupMemberBalance/GroupMemberBalance.jsx";
import Spinner from "../../../Spinner/Spinner.jsx";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers.jsx";
import LOG_LEVELS from "../../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../../shared/utils/debug/debugLog.js";
import SYSTEM from "../../../../../../shared/constants/system/systemConstants.js";

const { DEBUG } = LOG_LEVELS;

const GroupBalances = ({ groupCurrency }) => {
  const { showError } = useGlobalError();

  const {
    activeGroupCode: groupCode,
    groupMembers,
    isLoading,
    error: contextError,
  } = useGroupContext();

  useEffect(() => {
    if (contextError) {
      showError(contextError);
    }
  }, [contextError, showError]);

  const groupMemberDetails = useMemo(() => {
    if (!groupMembers || groupMembers.length === 0) return [];

    return groupMembers.map((user) => {
      // TODO: Refactor and move this calculation to the backend or a utility helper
      const isNoEdgeCase =
        groupMembers.length > 1 &&
        groupMembers.every(
          (member) => Math.abs(member.userBalance) <= SYSTEM.BALANCE_THRESHOLD,
        ) &&
        Math.abs(user.userBalance) <=
          (groupMembers.length - 1) * SYSTEM.BALANCE_THRESHOLD;

      debugLog(
        "Balance Edge Case Check",
        { userName: user.userName, isNoEdgeCase },
        DEBUG,
      );

      return {
        userId: user._id,
        userName: user.userName,
        userBalance:
          Math.abs(user.userBalance) <= SYSTEM.BALANCE_THRESHOLD && isNoEdgeCase
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
        <GroupMemberBalance
          groupMemberDetails={groupMemberDetails}
          groupCode={groupCode}
          groupCurrency={groupCurrency}
        />
      ) : (
        <span className={styles.issue}>
          <NotEnoughGroupMembers />
        </span>
      )}
    </div>
  );
};

export default GroupBalances;
