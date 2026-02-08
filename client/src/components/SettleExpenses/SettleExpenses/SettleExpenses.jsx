import { useEffect, useState } from "react";

import useFetchGroupCurrency from "../../../hooks/useFetchGroupCurrency";
import useHasGroupPersistedSettlements from "../../../hooks/useHasGroupPersistedSettlements";
import useFetchUnsettledGroupMembers from "../../../hooks/useFetchUnsettledGroupMembers";
import useUpdateGroupHasPersistedSettlements from "../../../hooks/useUpdateGroupHasPersistedSettlements";

import { fetchSettlements } from "../../../api/settlements/fetchSettlements";

import { getActiveGroupCode } from "../../../utils/localStorage";
import { groupUsersPerPositiveOrNegativeUserBalance } from "../../../utils/settlementUtils";

import { LOG_LEVELS } from "../../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../../shared/utils/debug/debugLog.js";

import RenderSettlementPaymentSuggestions from "../RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions";
import Spinner from "../../Spinner/Spinner";
import ExpensesSettled from "../ExpensesSettled/ExpensesSettled";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";

import styles from "./SettleExpenses.module.css";

const { LOG_ERROR, INFO } = LOG_LEVELS;

const SettleExpenses = () => {
  const groupCode = getActiveGroupCode();

  // --- Hooks ---
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

  // --- Local State ---
  const [displayError, setDisplayError] = useState(null);
  const [fixedDebitorCreditorOrder, setFixedDebitorCreditorOrder] =
    useState(null);
  const [persistedSettlements, setPersistedSettlements] = useState([]);

  // --- Derived Data ---
  const { positiveBalanceUsers, negativeBalanceUsers } =
    groupUsersPerPositiveOrNegativeUserBalance(
      unsettledUsers,
      fixedDebitorCreditorOrder,
    );

  // --- Effects ---

  // 1. Sync persisted order state
  useEffect(() => {
    if (isPersistedOrderFetched) {
      setFixedDebitorCreditorOrder(hasPersistedSettlements);
    }
  }, [hasPersistedSettlements, isPersistedOrderFetched]);

  // 2. Handle errors from all hooks
  useEffect(() => {
    if (persistedOrderError) setDisplayError(persistedOrderError);
    if (unsettledUsersError) setDisplayError(unsettledUsersError);
    if (updateStatusError) setDisplayError(updateStatusError);
  }, [persistedOrderError, unsettledUsersError, updateStatusError]);

  // 3. Handle Persisted Settlements Fetching & Correction Logic
  useEffect(() => {
    if (fixedDebitorCreditorOrder === true) {
      const getPersistedSettlements = async () => {
        try {
          const data = await fetchSettlements(groupCode);
          const settlements = data?.settlements || [];

          setPersistedSettlements(settlements);

          // If flag is true but no settlements exist, auto-correct the flag to false
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
            LOG_ERROR,
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

  // --- Render ---

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
