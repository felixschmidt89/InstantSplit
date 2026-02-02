// TODO: May be useful to write new related tests
// TODO: Remove when new tests are written
// Import functions to test
import {
  calculateAndAddUserBalance,
  calculateSuggestedSettlementPayments,
  filterUnsettledUsers,
  groupUsersPerPositiveOrNegativeUserBalance,
} from "./settlementUtils";
import {} from "./settlementUtils";

// Jest test for calculateSuggestedSettlementPayments function
describe("calculateSuggestedSettlementPayments", () => {
  it("calculates suggested settlement payments between users accurately", () => {
    // Arrange: Create sample arrays of users with positive and negative balances
    const positiveBalanceUsers = [
      { userName: "User1", userBalanceCalculated: 500 },
      { userName: "User2", userBalanceCalculated: 300 },
    ];

    const negativeBalanceUsers = [
      { userName: "User3", userBalanceCalculated: -140 },
      { userName: "User4", userBalanceCalculated: -200 },
      { userName: "User5", userBalanceCalculated: -300 },
      { userName: "User6", userBalanceCalculated: -160 },
    ];

    // Act: Call the calculateSuggestedSettlementPayments function with the sample arrays
    const resultSettlements = calculateSuggestedSettlementPayments(
      positiveBalanceUsers,
      negativeBalanceUsers,
    );

    // Assert: Check if the result is an array of settlement settlement payments, with the expected amounts and order, ie sorted by debtors alphabetically
    expect(resultSettlements).toEqual([
      { from: "User3", to: "User2", amount: "140.00" },
      { from: "User4", to: "User1", amount: "200.00" },
      { from: "User5", to: "User1", amount: "300.00" },
      { from: "User6", to: "User2", amount: "160.00" },
    ]);

    // Assert: Check if the users are removed from samples arrays, implying that all settlement suggestions have been made and no user has a balance left
    expect(positiveBalanceUsers).toEqual([]);
    expect(negativeBalanceUsers).toEqual([]);
  });
});

// Jest test for calculateAndAddUserBalance function with user balance precision
describe("calculateAndAddUserBalance", () => {
  it("calculates user balance and adds it as new property to user object", () => {
    // Arrange: Create a sample user object with transactional details with 5 decimal places to mock actual database data
    const user = {
      totalExpensesPaidAmount: 500.12345,
      totalPaymentsMadeAmount: 800.98765,
      totalExpenseBenefittedAmount: 200.54321,
      totalPaymentsReceivedAmount: 300.65432,
    };

    // Act: Call the calculateAndAddUserBalance function with the sample user object
    const resultUser = calculateAndAddUserBalance(user);

    // Assert: Check if the calculated user balance is exactly the sum of the provided amounts
    expect(resultUser).toHaveProperty("userBalanceCalculated");

    // Assert: Check if the calculated user balance is
    expect(resultUser.userBalanceCalculated).toEqual(799.91357);
  });
  it("calculates user balance and adds it as a new property to the user object using whole numbers only", () => {
    // Arrange: Create a sample user object with transactional details
    const user2 = {
      totalExpensesPaidAmount: 500,
      totalPaymentsMadeAmount: 800,
      totalExpenseBenefittedAmount: 200,
      totalPaymentsReceivedAmount: 300,
    };

    // Act: Call the calculateAndAddUserBalance function with the sample user object
    const resultUser = calculateAndAddUserBalance(user2);

    // Assert: Check if the user object has the calculated userBalanceCalculated property
    expect(resultUser).toHaveProperty("userBalanceCalculated");

    // Assert: Check if the calculated user balance is exactly the sum of the provided amounts
    expect(resultUser.userBalanceCalculated).toEqual(800);
  });
});

// Jest test for filterUnsettledUsers function
describe("filterUnsettledUsers", () => {
  it("filters users with unsettled user balances (absolute userBalanceCalculated > threshold of 0.01)", () => {
    // Arrange: Create a sample array of user details with various user balances, 5 decimal places to mock actual database data.
    const userDetails = [
      { userId: 1, userBalanceCalculated: 100.12345 },
      { userId: 2, userBalanceCalculated: -50.98765 },
      { userId: 3, userBalanceCalculated: 200.54321 },
      { userId: 4, userBalanceCalculated: -10.54321 },
      { userId: 5, userBalanceCalculated: 150.65432 },
      { userId: 6, userBalanceCalculated: -20.12345 },
      { userId: 7, userBalanceCalculated: 80.65432 },
      { userId: 8, userBalanceCalculated: -30.76543 },
      { userId: 9, userBalanceCalculated: 120.87654 },
      { userId: 10, userBalanceCalculated: 0.010001 },
      { userId: 11, userBalanceCalculated: 0.005 },
      { userId: 12, userBalanceCalculated: -0.008 },
      { userId: 13, userBalanceCalculated: 0.01 },
      { userId: 14, userBalanceCalculated: -0.003 },
      { userId: 15, userBalanceCalculated: 0.009 },
    ];

    // Act: Call the filterUnsettledUsers function with the sample array
    const result = filterUnsettledUsers(userDetails);

    // Assert: Check if the result array contains only users with unsettled balances based on the threshold
    expect(result).toEqual([
      { userId: 1, userBalanceCalculated: 100.12345 },
      { userId: 2, userBalanceCalculated: -50.98765 },
      { userId: 3, userBalanceCalculated: 200.54321 },
      { userId: 4, userBalanceCalculated: -10.54321 },
      { userId: 5, userBalanceCalculated: 150.65432 },
      { userId: 6, userBalanceCalculated: -20.12345 },
      { userId: 7, userBalanceCalculated: 80.65432 },
      { userId: 8, userBalanceCalculated: -30.76543 },
      { userId: 9, userBalanceCalculated: 120.87654 },
      { userId: 10, userBalanceCalculated: 0.010001 },
    ]);
  });

  it("handles empty input array, resulting in an empty array", () => {
    // Arrange: Create an empty array
    const userDetails = [];

    // Act: Call the filterUnsettledUsers function with the empty array
    const result = filterUnsettledUsers(userDetails);

    // Assert: Check if the result is an empty array
    expect(result).toEqual([]);
  });

  it("handles users with user balances within the threshold, resulting in an empty array", () => {
    // Arrange: Create a sample array of user details with user balances within the threshold
    const userDetails = [
      { userId: 1, userBalanceCalculated: 0.008 },
      { userId: 2, userBalanceCalculated: -0.007 },
      { userId: 3, userBalanceCalculated: 0.006 },
      { userId: 4, userBalanceCalculated: -0.005 },
      { userId: 5, userBalanceCalculated: 0.004 },
      { userId: 6, userBalanceCalculated: 0.01 },
    ];

    // Act: Call the filterUnsettledUsers function with the sample array
    const result = filterUnsettledUsers(userDetails);

    // Assert: Check if the result is an empty array since all users have balances within the threshold
    expect(result).toEqual([]);
  });
});

// Jest test for groupUsersPerPositiveOrNegativeUserBalance function
describe("groupUsersPerPositiveOrNegativeUserBalance", () => {
  it("groups users array based on user balance, resulting in an object with two arrays, one containing the users with positive and the other with negative balances", () => {
    // Arrange: Create sample array, 5 decimal places to mock actual database data. While sum of positiveBalanceUsers and negativeBalanceUsers should add up to 0 within the application, this is not necessary for this unit test.
    const unsettledUsers = [
      { userId: 1, userBalanceCalculated: 100.12345 },
      { userId: 2, userBalanceCalculated: -50.98765 },
      { userId: 3, userBalanceCalculated: 200.54321 },
      { userId: 4, userBalanceCalculated: -10.54321 },
      { userId: 5, userBalanceCalculated: 150.65432 },
      { userId: 6, userBalanceCalculated: -20.12345 },
      { userId: 7, userBalanceCalculated: 80.65432 },
      { userId: 8, userBalanceCalculated: -30.76543 },
      { userId: 9, userBalanceCalculated: 120.87654 },
      { userId: 10, userBalanceCalculated: -40.65432 },
      { userId: 11, userBalanceCalculated: 90.4321 },
      { userId: 12, userBalanceCalculated: -5.98765 },
    ];

    // Act: Call the groupUsersPerPositiveOrNegativeUserBalance function with the sample array
    const result = groupUsersPerPositiveOrNegativeUserBalance(unsettledUsers);

    // Assert: Check if the result object has the expected structure with positiveBalanceUsers and negativeBalanceUsers arrays
    expect(result).toEqual({
      positiveBalanceUsers: [
        { userId: 1, userBalanceCalculated: 100.12345 },
        { userId: 3, userBalanceCalculated: 200.54321 },
        { userId: 5, userBalanceCalculated: 150.65432 },
        { userId: 7, userBalanceCalculated: 80.65432 },
        { userId: 9, userBalanceCalculated: 120.87654 },
        { userId: 11, userBalanceCalculated: 90.4321 },
      ],
      negativeBalanceUsers: [
        { userId: 2, userBalanceCalculated: -50.98765 },
        { userId: 4, userBalanceCalculated: -10.54321 },
        { userId: 6, userBalanceCalculated: -20.12345 },
        { userId: 8, userBalanceCalculated: -30.76543 },
        { userId: 10, userBalanceCalculated: -40.65432 },
        { userId: 12, userBalanceCalculated: -5.98765 },
      ],
    });
  });

  it("handles empty input array, resulting in an object with two empty arrays", () => {
    // Arrange: Create an empty array
    const unsettledUsers = [];

    // Act: Call the groupUsersPerPositiveOrNegativeUserBalance function with the empty array
    const result = groupUsersPerPositiveOrNegativeUserBalance(unsettledUsers);

    // Assert: Check if the result object has two empty arrays
    expect(result).toEqual({
      positiveBalanceUsers: [],
      negativeBalanceUsers: [],
    });
  });
});
