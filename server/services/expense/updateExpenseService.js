import { StatusCodes } from 'http-status-codes';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../../shared/constants/models/expenseConstants.js';
import MEMBER_CONSTANTS from '../../../shared/constants/models/memberConstants.js';
import Expense from '../../models/Expense.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';

const { COMMON_FIELDS } = COMMON_CONSTANTS;
const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { MEMBER_FIELDS } = MEMBER_CONSTANTS;

const updateExpenseService = async (expenseId, groupCode, updateData) => {
  const {
    payerId: newPayerId,
    expenseDescription,
    expenseAmount: newAmount,
    beneficiaryIds: newBeneficiaryIds,
  } = updateData;

  const oldExpense = await Expense.findById(expenseId).lean();
  if (!oldExpense) {
    throw new ApiError('Expense not found', StatusCodes.NOT_FOUND);
  }

  const oldAmount = oldExpense[EXPENSE_FIELDS.AMOUNT];
  const oldPayerId = oldExpense[EXPENSE_FIELDS.PAYER].toString();
  const oldBeneficiaryIds = oldExpense[EXPENSE_FIELDS.BENEFICIARIES].map((id) =>
    id.toString(),
  );
  const oldAmountPerBeneficiary =
    oldExpense[EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY];

  const newAmountPerBeneficiary = newAmount / newBeneficiaryIds.length;

  const memberUpdateOperations = [];

  if (oldPayerId === newPayerId) {
    memberUpdateOperations.push(
      Member.updateOne(
        { [COMMON_FIELDS.ID]: newPayerId },
        { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: newAmount - oldAmount } },
      ),
    );
  } else {
    memberUpdateOperations.push(
      Member.updateOne(
        { [COMMON_FIELDS.ID]: oldPayerId },
        { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: -oldAmount } },
      ),
      Member.updateOne(
        { [COMMON_FIELDS.ID]: newPayerId },
        { $inc: { [MEMBER_FIELDS.EXPENSES_PAID]: newAmount } },
      ),
    );
  }

  memberUpdateOperations.push(
    Member.updateMany(
      { [COMMON_FIELDS.ID]: { $in: oldBeneficiaryIds } },
      {
        $inc: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: -oldAmountPerBeneficiary },
      },
    ),
    Member.updateMany(
      { [COMMON_FIELDS.ID]: { $in: newBeneficiaryIds } },
      {
        $inc: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: newAmountPerBeneficiary },
      },
    ),
  );

  const [updatedExpenseDocument] = await Promise.all([
    Expense.findByIdAndUpdate(
      expenseId,
      {
        [EXPENSE_FIELDS.DESCRIPTION]: expenseDescription,
        [EXPENSE_FIELDS.AMOUNT]: newAmount,
        [EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY]: newAmountPerBeneficiary,
        [EXPENSE_FIELDS.PAYER]: newPayerId,
        [EXPENSE_FIELDS.BENEFICIARIES]: newBeneficiaryIds,
      },
      { new: true, runValidators: true },
    ),
    ...memberUpdateOperations,
    // TODO: resetGroupSettlementsService(groupCode)
  ]);

  debugLog(
    'Expense and Member totals updated via delta logic',
    { expenseId, groupCode },
    LOG_LEVELS.INFO,
  );

  return updatedExpenseDocument;
};

export default updateExpenseService;
