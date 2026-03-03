import { useEffect, useState } from "react";

import useFetchGroupCurrency from "../../../hooks/useFetchGroupCurrency.jsx";
import useHasGroupPersistedSettlements from "../../../hooks/useHasGroupPersistedSettlements.jsx";
import useFetchUnsettledGroupMembers from "../../../hooks/useUnsettledGroupMembers.jsx";
import useUpdateGroupHasPersistedSettlements from "../../../hooks/useUpdateGroupHasPersistedSettlements.jsx";

import { fetchSettlements } from "../../../api/settlements/fetchSettlements.js";

import { useGroupContext } from "../../../context/GroupContext.jsx";

import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

import RenderSettlementPaymentSuggestions from "../RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions.jsx";
import Spinner from "../../Spinner/Spinner.jsx";
import ExpensesSettled from "../ExpensesSettled/ExpensesSettled.jsx";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay.jsx";

import styles from "./SettleExpenses.module.css";
import { groupUsersPerPositiveOrNegativeUserBalance } from "../../../utils/settlementUtils.jsx";

const { ERROR, INFO } = LOG_LEVELS;

const SettleExpenses = () => {
  const { activeGroupCode: groupCode } = useGroupContext();

  const { groupCurrency, isFetched: groupCurrencyIsFetched } =
    useFetchGroupCurrency(groupCode);

  const {
    hasPersistedSettlements,
    isFetched: isPersistedOrderFetched,
    error: persistedOrderError,
  } = useHasGroupPersistedSettlements(groupCode);

  const {
    unsettledUsers,
    isLoading: isUnsettledUsersLoading,
    error: unsettledUsersError,
  } = useFetchUnsettledGroupMembers(groupCode);

  const {
    updateStatus: updatePersistedStatus,
    error: updateStatusError,
    isLoading: isUpdatingStatus,
  } = useUpdateGroupHasPersistedSettlements();

  const [displayError, setDisplayError] = useState(null);
  const [fixedDebitorCreditorOrder, setFixedDebitorCreditorOrder] =
    useState(null);
  const [persistedSettlements, setPersistedSettlements] = useState([]);

  const { positiveBalanceUsers, negativeBalanceUsers } =
    groupUsersPerPositiveOrNegativeUserBalance(
      unsettledUsers,
      fixedDebitorCreditorOrder,
    );

  useEffect(() => {
    if (isPersistedOrderFetched) {
      setFixedDebitorCreditorOrder(hasPersistedSettlements);
    }
  }, [hasPersistedSettlements, isPersistedOrderFetched]);

  useEffect(() => {
    if (persistedOrderError) setDisplayError(persistedOrderError);
    if (unsettledUsersError) setDisplayError(unsettledUsersError);
    if (updateStatusError) setDisplayError(updateStatusError);
  }, [persistedOrderError, unsettledUsersError, updateStatusError]);

  useEffect(() => {
    if (fixedDebitorCreditorOrder === true) {
      const getPersistedSettlements = async () => {
        try {
          const data = await fetchSettlements(groupCode);
          const settlements = data?.settlements || [];

          setPersistedSettlements(settlements);

          if (!settlements?.length) {
            await updatePersistedStatus(groupCode, false);
            setFixedDebitorCreditorOrder(false);
            debugLog(
              "No persisted settlements, set fixedDebitorCreditorOrder to false",
              {},
              INFO,
            );
          }
        } catch (error) {
          debugLog(
            "Error fetching persisted settlements",
            { error: error.message },
            ERROR,
          );

          if (
            error.response?.data?.message ===
            "No settlements found for this group"
          ) {
            setPersistedSettlements([]);
            await updatePersistedStatus(groupCode, false);
            setFixedDebitorCreditorOrder(false);
            debugLog(
              "No settlements found, set fixedDebitorCreditorOrder to false",
              {},
              INFO,
            );
          } else {
            setDisplayError(
              error.response?.data?.message || "An error occurred",
            );
          }
        }
      };

      getPersistedSettlements();
    }
  }, [fixedDebitorCreditorOrder, groupCode, updatePersistedStatus]);

  if (isUnsettledUsersLoading || isUpdatingStatus) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>
        {unsettledUsers?.length && groupCurrencyIsFetched ? (
          <div className={styles.container}>
            <RenderSettlementPaymentSuggestions
              fixedDebitorCreditorOrder={fixedDebitorCreditorOrder}
              positiveBalanceUsers={positiveBalanceUsers}
              negativeBalanceUsers={negativeBalanceUsers}
              groupCurrency={groupCurrency}
              groupCode={groupCode}
              persistedSettlements={persistedSettlements}
            />
          </div>
        ) : (
          <ExpensesSettled />
        )}
      </div>
      <ErrorDisplay error={displayError} />
    </div>
  );
};

export default SettleExpenses;
