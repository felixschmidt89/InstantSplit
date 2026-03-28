import { StatusCodes } from 'http-status-codes';
import User from '../models/Member.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';

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
