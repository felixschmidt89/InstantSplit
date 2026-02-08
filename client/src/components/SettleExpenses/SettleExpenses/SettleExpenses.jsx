import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import styles from "./SettleExpenses.module.css";
import { getActiveGroupCode } from "../../../utils/localStorage";
import {
  calculateAndAddUserBalance,
  changeFixedDebitorCreditorOrderSetting,
  filterUnsettledUsers,
  getGroupHasPersistedDebitorCreditorOrder,
  groupUsersPerPositiveOrNegativeUserBalance,
} from "../../../utils/settlementUtils";
import { devLog } from "../../../utils/errorUtils";
import { API_URL } from "../../../constants/apiConstants";
import useFetchGroupCurrency from "../../../hooks/useFetchGroupCurrency";
import RenderSettlementPaymentSuggestions from "../RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions";
import Spinner from "../../Spinner/Spinner";
import ExpensesSettled from "../ExpensesSettled/ExpensesSettled";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";

const SettleExpenses = () => {
  const { t } = useTranslation();

  const groupCode = getActiveGroupCode();
  const { groupCurrency, isFetched: groupCurrencyIsFetched } =
    useFetchGroupCurrency(groupCode);

  const [unsettledUsers, setUnsettledUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fixedDebitorCreditorOrder, setFixedDebitorCreditorOrder] =
    useState(null);
  const [statusError, setStatusError] = useState(null);
  const [persistedSettlements, setPersistedSettlements] = useState([]);

  const { positiveBalanceUsers, negativeBalanceUsers } =
    groupUsersPerPositiveOrNegativeUserBalance(
      unsettledUsers,
      fixedDebitorCreditorOrder,
    );

  useEffect(() => {
    const getFixedDebitorCreditorOrderSetting = async () => {
      try {
        const result =
          await getGroupHasPersistedDebitorCreditorOrder(groupCode);

        if (result?.success) {
          setFixedDebitorCreditorOrder(result.data);
          devLog("Fixed debitor/creditor order status:", result.data);
        } else {
          setStatusError(result?.error || t("generic-error-message"));
        }
      } catch (error) {
        devLog("Error fetching fixedDebitorCreditorOrder status:", error);
        setStatusError(t("generic-error-message"));
      }
    };

    getFixedDebitorCreditorOrderSetting();
  }, [groupCode, t]);

  useEffect(() => {
    const fetchAndIdentifyUnsettledUsers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/by-groupcode/${groupCode}`,
        );
        const responseData = response.data;
        devLog("User details fetched:", response);

        if (responseData?.users?.length) {
          const userDetails = responseData.users.map((user) =>
            calculateAndAddUserBalance(user),
          );
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
          error,
        );
        setError(t("generic-error-message"));
        setIsLoading(false);
      }
    };

    fetchAndIdentifyUnsettledUsers();
  }, [groupCode, t]);

  useEffect(() => {
    if (fixedDebitorCreditorOrder === true) {
      const fetchPersistedSettlements = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/settlements/${groupCode}`,
          );
          const settlements = response.data?.settlements || [];

          setPersistedSettlements(settlements);
          devLog("Persisted settlements fetched:", response.data);

          if (!settlements?.length) {
            await changeFixedDebitorCreditorOrderSetting(groupCode, false);
            setFixedDebitorCreditorOrder(false);
            devLog(
              "No persisted settlements, set fixedDebitorCreditorOrder to false",
            );
          }
        } catch (error) {
          devLog("Error fetching persisted settlements:", error);

          if (
            error.response?.data?.message ===
            "No settlements found for this group"
          ) {
            setPersistedSettlements([]);
            await changeFixedDebitorCreditorOrderSetting(groupCode, false);
            setFixedDebitorCreditorOrder(false);
            devLog(
              "No settlements found, set fixedDebitorCreditorOrder to false",
            );
          } else {
            setError(
              error.response?.data?.message || t("generic-error-message"),
            );
          }
        }
      };

      fetchPersistedSettlements();
    }
  }, [fixedDebitorCreditorOrder, groupCode, t]);

  return (
    <div>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
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
      )}
      <ErrorDisplay error={error} />
    </div>
  );
};

export default SettleExpenses;
