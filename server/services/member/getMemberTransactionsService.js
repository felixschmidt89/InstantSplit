import Expense from '../../models/Expense.js';
import Payment from '../../models/Payment.js';
import sortByDateDescending from '../../../shared/utils/dates/sortByDateDescending.js';

const getMemberTransactionsService = async (memberId) => {
  const [expenses, payments] = await Promise.all([
    Expense.find({
      $or: [{ expensePayer: memberId }, { expenseBeneficiaries: memberId }],
    })
      .populate('expensePayer', 'memberName')
      .populate('expenseBeneficiaries', 'memberName')
      .lean(),

    Payment.find({
      $or: [{ paymentMaker: memberId }, { paymentRecipient: memberId }],
    })
      .populate('paymentMaker', 'memberName')
      .populate('paymentRecipient', 'memberName')
      .lean(),
  ]);

  const transactions = [
    ...expenses.map((item) => ({ ...item, itemType: 'expense' })),
    ...payments.map((item) => ({ ...item, itemType: 'payment' })),
  ];

  return sortByDateDescending(transactions, 'createdAt');
};

export default getMemberTransactionsService;
