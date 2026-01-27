// Constants and Utils
import axios from "axios";
import { BALANCE_THRESHOLD } from "../constants/dataConstants";
import { devLog } from "./errorUtils";

import { API_URL } from "@client-constants/apiConstants";
/**
 * Calculates suggested settlement payments between users with positive and negative balances.
 * Iteratively identifies user pairs, determines the maximum settlement amount, and records settlement payment suggestions in an array.
 * Continues the process until either positive or negative balance users are exhausted, providing an array of settlement payment suggestions.
 *
 * @param {Array} positiveBalanceUsers - An array of users with positive balances.
 * @param {Array} negativeBalanceUsers - An array of users with negative balances.
 * @returns {Array} - An array of settlement payment suggestions.
 */
export const calculateSuggestedSettlementPayments = (
  positiveBalanceUsers,
  negativeBalanceUsers,
) => {
  // Array to gather settlement payment suggestions
  const suggestedSettlementPayments = [];

  // Calculate settlement payment suggestions between users with negative and users with positive balance
  while (positiveBalanceUsers.length > 0 && negativeBalanceUsers.length > 0) {
    const creditor = positiveBalanceUsers[0];
    const debtor = negativeBalanceUsers[0];

    // Calculate the highest possible amount for a settlement payment between a user with positive and negative balance
    const amountToSettle = Math.min(
      Math.abs(debtor.userBalanceCalculated),
      creditor.userBalanceCalculated,
    );

    // Add that settlement payment suggestion to settlements array
    suggestedSettlementPayments.push({
      debtorId: debtor._id,
      creditorId: creditor._id,
      from: debtor.userName,
      to: creditor.userName,
      amount: amountToSettle.toFixed(2),
    });

    // Update the userBalances after adding the settlement payment suggestion to settlements array
    creditor.userBalanceCalculated -= amountToSettle;
    debtor.userBalanceCalculated += amountToSettle;

    // Remove settled users
    if (creditor.userBalanceCalculated === 0) {
      positiveBalanceUsers.shift();
    }

    if (debtor.userBalanceCalculated === 0) {
      negativeBalanceUsers.shift();
    }
  }

  // Remove invalid payment suggestions with a 0.00 amount from settlements array (such payment has occurred in at least 1 case)
  for (let i = suggestedSettlementPayments.length - 1; i >= 0; i--) {
    if (suggestedSettlementPayments[i].amount === "0.00") {
      suggestedSettlementPayments.splice(i, 1);
    }
  }

  // Sort suggestedSettlementPayments by debtors alphabetically
  suggestedSettlementPayments.sort((a, b) => a.from.localeCompare(b.from));

  devLog(
    "Suggested settlement payments calculated:",
    suggestedSettlementPayments,
  );
  return suggestedSettlementPayments;
};

/**
 * Calculates the user balance property based a user's expense and payment transactions and adds it to user object
 *
 * @param {Object} user - The user object transactional details
 * @returns {Object} - The user object with an additional property `userBalanceCalculated`.
 */
export const calculateAndAddUserBalance = (user) => {
  const userBalanceCalculated =
    user.totalExpensesPaidAmount +
    user.totalPaymentsMadeAmount -
    user.totalExpenseBenefittedAmount -
    user.totalPaymentsReceivedAmount;

  return {
    ...user,
    userBalanceCalculated,
  };
};

/**
 * Filters users with unsettled user balances, treating users with  user balances within the threshold (0.01) as settled
 *
 * @param {Array} userDetails - Array of user details with balance information.
 * @returns {Array} - Array of unsettled user details.
 */
export const filterUnsettledUsers = (userDetails) => {
  return userDetails.filter(
    (user) => Math.abs(user.userBalanceCalculated) > BALANCE_THRESHOLD,
  );
};

/**
 * Groups users with unsettled balances into those with positive and negative balances,
 * sorting positive balances in descending order and negative balances in ascending order.
 *
 * @param {Object[]} unsettledUsers - Array of user objects with unsettled balances.
 * @param {number} unsettledUsers[].userBalanceCalculated - The calculated balance for the user (positive or negative).
 * @returns {Object} An object containing two arrays:
 * @returns {Object[]} positiveBalanceUsers - Users with positive balances (userBalanceCalculated > 0), sorted in descending order by balance.
 * @returns {Object[]} negativeBalanceUsers - Users with negative balances (userBalanceCalculated < 0), sorted in ascending order by balance.
 */
export const groupUsersPerPositiveOrNegativeUserBalance = (unsettledUsers) => {
  const positiveBalanceUsers = unsettledUsers
    .filter((user) => user.userBalanceCalculated > 0)
    .map((user) => ({
      ...user,
    }))
    .sort((a, b) => b.userBalanceCalculated - a.userBalanceCalculated);

  const negativeBalanceUsers = unsettledUsers
    .filter((user) => user.userBalanceCalculated < 0)
    .map((user) => ({
      ...user,
    }))
    .sort((a, b) => a.userBalanceCalculated - b.userBalanceCalculated);

  devLog("Users with positive balance calculated:", positiveBalanceUsers);
  devLog("Users with negative balance calculated:", negativeBalanceUsers);

  return {
    positiveBalanceUsers,
    negativeBalanceUsers,
  };
};

/**
 * Updates the fixedDebitorCreditorOrder setting for a group
 * @param {string} groupCode - The groupCode of the group
 * @param {boolean} fixedDebitorCreditorOrder - The new fixedDebitorCreditorOrder value
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const changeFixedDebitorCreditorOrderSetting = async (
  groupCode,
  fixedDebitorCreditorOrder,
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/groups/fixedDebitorCreditorOrder/${groupCode}`,
      {
        groupCode,
        fixedDebitorCreditorOrder,
      },
    );
    devLog("fixedDebitorCreditorOrder updated:", response);
    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog("Error updating fixedDebitorCreditorOrder:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Failed to update fixedDebitorCreditorOrder setting",
      data: null,
    };
  }
};

/**
 * Fetches whether a group has a persisted debitor/creditor order
 * @param {string} groupCode - The groupCode of the group
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const getGroupHasPersistedDebitorCreditorOrder = async (groupCode) => {
  try {
    const response = await axios.get(
      `${API_URL}/groups/has-persisted-order/${groupCode}`,
    );
    devLog("groupHasPersistedDebitorCreditorOrder status fetched:", response);
    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog(
      "Error fetching groupHasPersistedDebitorCreditorOrder status:",
      error,
    );
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Failed to fetch groupHasPersistedDebitorCreditorOrder status",
      data: null,
    };
  }
};

/**
 * Deletes all settlements for a group by groupCode.
 * @param {string} groupCode - The groupCode of the group.
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const deleteAllSettlementsForGroup = async (groupCode) => {
  try {
    if (!groupCode) {
      throw new Error("Group code is required");
    }

    const response = await axios.delete(`${API_URL}/settlements/${groupCode}`);
    devLog(`All settlements for group ${groupCode} deleted:`, response.data);

    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog(`Error deleting all settlements for group ${groupCode}:`, error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        `Failed to delete settlements for group ${groupCode}`,
      data: null,
    };
  }
};
