import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
  deleteUser,
  deleteAllUsers,
  getUserInfo,
  listExpensesAndPaymentsByUser,
  setDebitorIndex,
} from '../controllers/userController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';

const router = express.Router();

// Create new user
router.post('/', createUser);
// Get user info by id
router.get('/:userId', getUserInfo);

// Change user name
router.patch('/:userId', changeUserName);

// Delete user
router.delete('/:userId', deleteUser);

// List all expenses and payments of a group
router.get('/:userId/expenses-and-payments', listExpensesAndPaymentsByUser);

// List group members by groupCode
router.get('/byGroupCode/:groupCode', listAllUsersByGroupCode);

// Update debitorIndex for a user
router.patch('/:userId/debitorIndex', setDebitorIndex);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all users
router.get('/debug/all', developmentOnlyMiddleware, listAllUsers);
// Delete all users
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllUsers);

export default router;
