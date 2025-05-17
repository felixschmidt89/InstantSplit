// Constants and Utils
import axios from "axios";
import { BALANCE_THRESHOLD } from "../constants/dataConstants";
import { devLog } from "./errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

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
  negativeBalanceUsers
) => {
  // Array to gather settlement payment suggestions
  const suggestedSettlementPayments = [];

  // Sort users with positive balance from highest to lowest
  positiveBalanceUsers.sort(
    (a, b) => b.userBalanceCalculated - a.userBalanceCalculated
  );

  // Sort users with negative balance from lowest to highest
  negativeBalanceUsers.sort(
    (a, b) => a.userBalanceCalculated - b.userBalanceCalculated
  );

  // Calculate settlement payment suggestions between users with negative and users with positive balance
  while (positiveBalanceUsers.length > 0 && negativeBalanceUsers.length > 0) {
    const creditor = positiveBalanceUsers[0];
    const debtor = negativeBalanceUsers[0];

    // Calculate the highest possible amount for a settlement payment between a user with positive and negative balance
    const amountToSettle = Math.min(
      Math.abs(debtor.userBalanceCalculated),
      creditor.userBalanceCalculated
    );

    // Add that settlement payment suggestion to settlements array
    suggestedSettlementPayments.push({
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
    suggestedSettlementPayments
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
    (user) => Math.abs(user.userBalanceCalculated) > BALANCE_THRESHOLD
  );
};

/**
 * Groups those users with unsettled positive user balances and those with negative user balances.
 *
 * @param {Array} unsettledUsers - Array of unsettled user details.
 * @returns {Object} - Object containing arrays of users with positive and negative balances.
 */
export const groupUsersPerPositiveOrNegativeUserBalance = (unsettledUsers) => {
  const positiveBalanceUsers = unsettledUsers
    .filter((user) => user.userBalanceCalculated > 0)
    .map((user) => ({
      ...user,
    }));

  const negativeBalanceUsers = unsettledUsers
    .filter((user) => user.userBalanceCalculated < 0)
    .map((user) => ({
      ...user,
    }));
  devLog("Users with positive balance calculated:", positiveBalanceUsers);
  devLog("Users with negative balance calculated:", negativeBalanceUsers);

  return {
    positiveBalanceUsers,
    negativeBalanceUsers,
  };
};

/**
 * Resets creditorIndex and debitorIndex to 0 for all users in a group
 * @param {string} groupCode - The groupCode of the group
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const resetCreditorIndicesAndDebitorIndices = async (groupCode) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/groups/reset-indices/${groupCode}`
    );
    devLog("Creditor and debitor indices reset:", response);
    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog("Error resetting creditor and debitor indices:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to reset indices",
      data: null,
    };
  }
};

/**
 * Updates the debitorIndex for a specific user
 * @param {string} groupCode - The groupCode of the group
 * @param {string} userId - The ID of the user to update
 * @param {number} debitorIndex - The new debitorIndex value
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const setDebitorIndex = async (groupCode, userId, debitorIndex) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/users/${userId}/debitorIndex`,
      {
        groupCode,
        debitorIndex,
      }
    );
    devLog("debitorIndex updated:", response);
    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog("Error updating debitorIndex:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update debitorIndex",
      data: null,
    };
  }
};

/**
 * Updates the creditorIndex for a specific user
 * @param {string} groupCode - The groupCode of the group
 * @param {string} userId - The ID of the user to update
 * @param {number} creditorIndex - The new creditorIndex value
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const setCreditorIndex = async (groupCode, userId, creditorIndex) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/users/${userId}/creditorIndex`,
      {
        groupCode,
        creditorIndex,
      }
    );
    devLog("creditorIndex updated:", response);
    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error) {
    devLog("Error updating creditorIndex:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update creditorIndex",
      data: null,
    };
  }
};

/**
 * Updates the fixedDebitorCreditorOrder setting for a group
 * @param {string} groupCode - The groupCode of the group
 * @param {boolean} fixedDebitorCreditorOrder - The new fixedDebitorCreditorOrder value
 * @returns {Promise<Object>} - Promise resolving to { success, error, data }
 */
export const changeFixedDebitorCreditorOrderSetting = async (
  groupCode,
  fixedDebitorCreditorOrder
) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/groups/fixedDebitorCreditorOrder/${groupCode}`,
      {
        groupCode,
        fixedDebitorCreditorOrder,
      }
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
