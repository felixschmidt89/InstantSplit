class ApiError extends Error {
  /**
   * @param {number} statusCode - The HTTP status code (e.g., 404, 400)
   * @param {string} errorCode - The specific V2 Atomic error code from errorConstants.js
   */
  constructor(statusCode, errorCode) {
    super(errorCode);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
