import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { setGroupLastActivePropertyToNow } from '../utils/databaseUtils.js';

export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;
    setGroupLastActivePropertyToNow(groupCode);

    // Check if a user with the same name and group code already exists
    const existingUser = await User.findOne({ userName, groupCode });

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'name is already taken in this group',
      });
    }
    const user = await User.create({ userName, groupCode });
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      user,
      message: 'User created successfully',
    });
  } catch (error) {
    devLog('error:', error);
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error creating user:',
        'Failed to create user. Please try again later.',
      );
      sendInternalError();
    }
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const groupCode = user.groupCode;

    setGroupLastActivePropertyToNow(groupCode);

    res.status(StatusCodes.OK).json({
      status: 'success',
      user,
      message: 'User info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving user info:',
      'Failed to retrieve user information. Please try again later.',
    );
    sendInternalError();
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, groupCode } = req.body;

    devLog('Updating username. Received data:', {
      userId,
      userName,
      groupCode,
    });

    setGroupLastActivePropertyToNow(groupCode);

    // Check if a user with the same name and group code already exists
    const existingUser = await User.findOne({ userName, groupCode });

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'name is already taken in this group',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { userName: userName } },
      { new: true, runValidators: true },
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedUser,
      message: 'User name updated successfully.',
    });
  } catch (error) {
    devLog('error:', error);
    // Handle validation errors separately
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error updating user name:',
        'Failed to update user name. Please try again later.',
      );
      sendInternalError();
    }
  }
};

export const listExpensesAndPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({
      $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
    })
      .populate('expensePayer', 'userName')
      .populate('expenseBeneficiaries', 'userName')
      .lean(); // get JavaScript objects instead of Mongoose documents

    const payments = await Payment.find({
      $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
    })
      .populate('paymentMaker', 'userName')
      .populate('paymentRecipient', 'userName')
      .lean(); // get JavaScript objects instead of Mongoose documents

    // Add 'itemType' property
    const userExpensesAndPayments = [
      ...expenses.map((item) => ({ ...item, itemType: 'expense' })),
      ...payments.map((item) => ({ ...item, itemType: 'payment' })),
    ];

    // Sort userExpensesAndPayments by createdAt
    userExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    // Convert createdAt values to Date objects
    userExpensesAndPayments.forEach((item) => {
      item.createdAt = new Date(item.createdAt);
    });

    // Sort userExpensesAndPayments by createdAt
    userExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    res.status(StatusCodes.OK).json({
      status: 'success',
      results: userExpensesAndPayments.length,
      expenseCount: expenses.length,
      paymentCount: payments.length,
      userExpensesAndPayments,
      message: 'All user expenses and payments retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing user expenses and payments:',
      'Failed to list user expenses and payments. Please try again later.',
    );
    sendInternalError();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user has associated transactions
    const [expenses, payments] = await Promise.all([
      Expense.find({
        $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
      }),
      Payment.find({
        $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
      }),
    ]);

    // Disallow deleting the user if there are associated transactions
    if (expenses.length > 0 || payments.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message:
          'User has associated transactions. Please remove the user from all transactions.',
      });
    }

    const userToDelete = await User.findOne({
      _id: userId,
    });

    const groupCode = userToDelete.groupCode;

    setGroupLastActivePropertyToNow(groupCode);

    await User.deleteOne({ _id: userToDelete._id });

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting user:',
      'Failed to delete user. Please try again later.',
    );
    sendInternalError();
  }
};

export const listAllUsersByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;

    setGroupLastActivePropertyToNow(groupCode);

    // Find users by group code
    let users = await User.find({ groupCode });

    // Sort users alphabetically by userName
    users.sort((a, b) => a.userName.localeCompare(b.userName));

    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      users,
      message: 'User list retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing group members by groupCode:',
      'Failed to list group members. Please try again later.',
    );
    sendInternalError();
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      users,
      message: 'All users retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all users:',
      'Failed to list all users. Please try again later.',
    );
    sendInternalError();
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All users deleted successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting all users:',
      'Failed to delete all users. Please try again later.',
    );
    sendInternalError();
  }
};
