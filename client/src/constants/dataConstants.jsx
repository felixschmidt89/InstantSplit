/**
 * Balance threshold for financial calculations.
 * If the absolute value of a balance is less than or equal to this threshold (0.01),
 * it is considered as effectively zero for practical purposes.
 */
const BALANCE_THRESHOLD = 0.01;

/**
 * Number of days without any group activity prior to purging
 * all related group data from db.
 */
const INACTIVE_DAYS = 90;

/**
 * The minimum valid amount for amount inputs.
 */
const MINIMUM_VALID_AMOUNT = 0.01;

const BUSINESS_RULES = {
  BALANCE_THRESHOLD,
  INACTIVE_DAYS,
  MINIMUM_VALID_AMOUNT,
};

export default BUSINESS_RULES;
