// TODO: move to shared constants if needed elsewhere

/**
 * Constant representing the current year.
 * @type {number}
 */
export const currentYear = new Date().getFullYear();

// TODO: Delete when used in application, Date.now() is safer
export const currentTimeStamp = Date.now();

/**
 * Constant representing 24h in milliseconds.
 * @type {number}
 */
export const twentyFourHours = 24 * 60 * 60 * 1000;
