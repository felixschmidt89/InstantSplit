// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import {
  calculateAndAddUserBalance,
  changeFixedDebitorCreditorOrderSetting,
  filterUnsettledUsers,
  getGroupHasPersistedDebitorCreditorOrder,
  groupUsersPerPositiveOrNegativeUserBalance,
  resetCreditorIndicesAndDebitorIndices,
  setCreditorIndex,
  setDebitorIndex,
} from "../../../../utils/settlementUtils";

// Hooks
import useFetchGroupCurrency from "../../../../hooks/useFetchGroupCurrency";

// Components
import Spinner from "../../../common/Spinner/Spinner";
import ExpensesSettled from "../ExpensesSettled/ExpensesSettled";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import RenderSettlementPaymentSuggestions from "../RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions";

// Styles
import styles from "./SettleExpenses.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component to settle expenses, identifying users with unsettled user balances.
 * @returns {JSX.Element} React component. */
const SettleExpenses = () => {
  const { t } = useTranslation();

  const groupCode = localStorage.getItem("activeGroupCode");
  const [unsettledUsers, setUnsettledUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fixedDebitorCreditorOrder, setFixedDebitorCreditorOrder] =
    useState(null);
  const [statusError, setStatusError] = useState(null);
  const { groupCurrency, isFetched: groupCurrencyIsFetched } =
    useFetchGroupCurrency(groupCode);

  // Fetch fixedDebitorCreditorOrder status
  useEffect(() => {
    const getFixedDebitorCreditorOrderSetting = async () => {
      try {
        const result =
          await getGroupHasPersistedDebitorCreditorOrder(groupCode);
        if (result.success) {
          setFixedDebitorCreditorOrder(result.data);
          devLog("Fixed debitor/creditor order status:", result.data);
        } else {
          setStatusError(result.error || t("generic-error-message"));
        }
      } catch (error) {
        devLog("Error fetching fixedDebitorCreditorOrder status:", error);
        setStatusError(t("generic-error-message"));
      }
    };

    getFixedDebitorCreditorOrderSetting();
  }, [groupCode]);

  useEffect(() => {
    const fetchAndIdentifyUnsettledUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data;
        devLog("User details fetched:", response);

        if (responseData.users && responseData.users.length > 0) {
          // Calculate and add user balance property
          const userDetails = responseData.users.map((user) => {
            return calculateAndAddUserBalance(user);
          });
          const unsettledUserDetails = filterUnsettledUsers(userDetails);
          devLog("Unsettled users identified:", unsettledUserDetails);
          setUnsettledUsers(unsettledUserDetails);
        } else {
          setUnsettledUsers([]);
        }
        setIsLoading(false);
      } catch (error) {
        devLog(
          "Error fetching and identifying users with unsettled balances:",
          error
        );
        setError(t("generic-error-message"));
        setIsLoading(false);
      }
    };

    fetchAndIdentifyUnsettledUsers();
  }, [groupCode]);

  const { positiveBalanceUsers, negativeBalanceUsers } =
    groupUsersPerPositiveOrNegativeUserBalance(
      unsettledUsers,
      fixedDebitorCreditorOrder
    );

  // setDebitorIndex(groupCode, "66433b1c0a85d1ccbbcf234e", 10);
  // setCreditorIndex(groupCode, "66433b1c0a85d1ccbbcf234e", 10);
  // resetCreditorIndicesAndDebitorIndices(groupCode);
  // changeFixedDebitorCreditorOrderSetting(groupCode, true);

  return (
    <div>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div>
          {/* Check if there are users with unsettled balances */}
          {unsettledUsers.length !== 0 && groupCurrencyIsFetched ? (
            <div className={styles.container}>
              <RenderSettlementPaymentSuggestions
                positiveBalanceUsers={positiveBalanceUsers}
                negativeBalanceUsers={negativeBalanceUsers}
                groupCurrency={groupCurrency}
                groupCode={groupCode}
              />
            </div>
          ) : (
            <ExpensesSettled />
          )}
        </div>
      )}
      <ErrorDisplay error={error} />
    </div>
  );
};
export default SettleExpenses;
