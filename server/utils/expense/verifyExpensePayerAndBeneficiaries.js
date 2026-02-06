import { StatusCodes } from 'http-status-codes';

export const verifyExpensePayerAndBeneficiaries = async (
  expensePayerId,
  expenseBeneficiaryIds,
  groupCode,
) => {
  if (!expensePayerId) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: 'Missing expense payer ID',
    };
  }

  if (!expenseBeneficiaryIds || !expenseBeneficiaryIds.length) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: 'At least 1 expense beneficiary is required',
    };
  }

  const expensePayer = await User.findById(expensePayerId);

  if (!expensePayer) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: 'Expense payer not found',
    };
  }

  if (expensePayer.groupCode !== groupCode) {
    throw {
      status: StatusCodes.FORBIDDEN,
      message: 'Payer does not belong to this group',
    };
  }

  const expenseBeneficiaries = await User.find({
    _id: { $in: expenseBeneficiaryIds },
    groupCode,
  });

  if (expenseBeneficiaries.length !== expenseBeneficiaryIds.length) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: 'One or more beneficiaries could not be found in this group',
    };
  }

  return { expensePayer, expenseBeneficiaries };
};
