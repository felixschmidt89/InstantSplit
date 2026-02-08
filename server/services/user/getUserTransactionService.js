import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';

export const getUserTransactionsService = async (userId) => {
  const [expenses, payments] = await Promise.all([
    Expense.find({
      $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
    })
      .populate('expensePayer', 'userName')
      .populate('expenseBeneficiaries', 'userName')
      .lean(),

    Payment.find({
      $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
    })
      .populate('paymentMaker', 'userName')
      .populate('paymentRecipient', 'userName')
      .lean(),
  ]);

  const transactions = [
    ...expenses.map((item) => ({ ...item, itemType: 'expense' })),
    ...payments.map((item) => ({ ...item, itemType: 'payment' })),
  ];

  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return {
    transactions: transactions || [],
    expenseCount: expenses.length,
    paymentCount: payments.length,
    results: transactions.length,
  };
};
