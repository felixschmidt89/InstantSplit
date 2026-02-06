import axios from 'axios';
import Group from '../../models/Group.js';

const API_FULL_URL = process.env.API_FULL_URL;

/**
 * Data Seeder Script
 * -------------------
 * This script is used to seed a group with proper user & expenses test data. It requires creating a new group in the FE and then passing its related groupCode.
 * Script uses application endpoints rather than manipulating the database directly.
 *
 * @param {string} groupCode - The groupCode of the group to seed.
 * @returns {Promise<void>} A promise that resolves when the seeding process is complete.
 */

async function seedDemoData(groupCode) {
  if (!groupCode) {
    console.error('No groupCode provided. Exiting seedDemoData script.');
    return;
  }

  const group = await Group.findOne({ groupCode });
  if (!group) {
    console.error('Group not found in database. Exiting seedDemoData script.');
    return;
  }

  const users = [
    { userName: 'Emma', groupCode },
    { userName: 'Liam', groupCode },
    { userName: 'Sophia', groupCode },
    { userName: 'Noah', groupCode },
    { userName: 'Olivia', groupCode },
    { userName: 'Ethan', groupCode },
    { userName: 'Ava', groupCode },
    { userName: 'Oliver', groupCode },
  ];

  async function createUser(user) {
    try {
      const response = await axios.post(`${API_FULL_URL}/users`, user);
      console.log(
        `User ${user.userName} created successfully. Response:`,
        response.data,
      );
    } catch (error) {
      console.error(
        `Error creating user ${user.userName}:`,
        error.response.data,
      );
      throw error;
    }
  }

  // Function to create users sequentially
  async function createUsersSequentially() {
    for (const user of users) {
      await createUser(user);
    }
  }

  // Define expenses to create
  const expenses = [
    {
      expenseDescription: 'Flight tickets from US to Rome',
      expenseAmount: 3000,
    },
    {
      expenseDescription: 'Airport shuttle from Fiumicino to hotel',
      expenseAmount: 50,
    },
    { expenseDescription: 'Groceries for the week', expenseAmount: 400 },
    { expenseDescription: 'Colosseum guided tour', expenseAmount: 200 },
    { expenseDescription: 'Gondola ride in Venice', expenseAmount: 150 },
    {
      expenseDescription: 'Wine tasting experience in Tuscany',
      expenseAmount: 300,
    },
    { expenseDescription: 'Vatican City museum entry', expenseAmount: 40 },
    { expenseDescription: 'Pizza-making class in Naples', expenseAmount: 200 },
    { expenseDescription: 'Sightseeing tour in Florence', expenseAmount: 100 },
    { expenseDescription: 'Boat tour along Amalfi Coast', expenseAmount: 250 },
    { expenseDescription: 'Hiking Mount Vesuvius', expenseAmount: 50 },
    { expenseDescription: 'Opera performance in Verona', expenseAmount: 800 },
    { expenseDescription: 'Balloon ride over Tuscany', expenseAmount: 600 },
    {
      expenseDescription: 'Uffizi Gallery tickets in Florence',
      expenseAmount: 80,
    },
    { expenseDescription: 'Gelato tasting in Rome', expenseAmount: 40 },
    { expenseDescription: 'Street food in Bologna', expenseAmount: 120 },
    { expenseDescription: 'Boat trip on Lake Como', expenseAmount: 150 },
    { expenseDescription: 'Coffee tasting', expenseAmount: 40 },
    {
      expenseDescription: 'Visit to the Blue Grotto in Capri',
      expenseAmount: 80,
    },
    { expenseDescription: 'Art and history tour in Milan', expenseAmount: 120 },
    {
      expenseDescription: 'Classical music concert in Venice',
      expenseAmount: 400,
    },
    { expenseDescription: 'Train tickets', expenseAmount: 300 },
  ];

  // Function to create expenses after all users have been created
  async function createExpenses() {
    // Loop through the array of expenses and create them one by one
    for (const expense of expenses) {
      // Add random expense payer
      const randomUserIndex = Math.floor(Math.random() * users.length);
      expense.expensePayerName = users[randomUserIndex].userName;

      // Set expenseBeneficiariesNames to an array of userNames
      expense.expenseBeneficiariesNames = users.map((user) => user.userName);

      try {
        const response = await axios.post(`${API_FULL_URL}/expenses`, {
          ...expense,
          groupCode,
        });
        console.log(
          `Expense for user ${expense.expensePayerName} created successfully. Response:`,
          response.data,
        );
      } catch (error) {
        console.error(
          `Error creating expense for user ${expense.expensePayerName}:`,
          error.response.data,
        );
      }
    }
  }

  // Run the script
  createUsersSequentially()
    .then(() => {
      console.log('All users created successfully. Starting expense creation.');
      return createExpenses();
    })
    .then(() => {
      console.log('All expenses created successfully.');
    })
    .catch((error) => {
      console.error('Script failed:', error);
    });
}

export default seedDemoData;
