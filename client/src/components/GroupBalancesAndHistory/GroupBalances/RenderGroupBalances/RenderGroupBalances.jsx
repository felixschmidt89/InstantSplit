import { useMemo, useEffect } from "react";

import styles from "./RenderGroupBalances.module.css";
import { useGroupContext } from "../../../../context/GroupContext";
import { useGlobalError } from "../../../../context/ErrorContext.jsx";
import { BALANCE_THRESHOLD } from "../../../../constants/dataConstants";
import RenderGroupMemberBalance from "../RenderGroupMemberBalance/RenderGroupMemberBalance";
import Spinner from "../../../Spinner/Spinner";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers";
import LOG_LEVELS from "../../../../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../../../../shared/utils/debug/debugLog.js";

const { DEBUG } = LOG_LEVELS;

const RenderGroupBalances = ({ groupCurrency }) => {
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
    </div>
  );
};

export default RenderGroupBalances;
