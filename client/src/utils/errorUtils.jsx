import { StatusCodes } from "http-status-codes";

// TODO: Delete devLog and use debugLog instead throughout the codebase
/**
 * Utility function to log messages and/or errors in the development environment only.
 *
 * @param {string} [message="devLog"] - Message to be logged.
 * @param {*} [data] - Optional data to be logged. If an error object is provided, it will be logged as an error.
 * @returns {void}
 */
export const devLog = (message = "devLog", data) => {
  if (process.env.NODE_ENV === "development") {
    if (data !== undefined) {
      if (data instanceof Error) {
        console.error(message, data);
      } else {
        console.log(message, data);
      }
    } else {
      console.log(message);
    }
  }
};

/**
 * Handles API errors, sets the appropriate error translation and triggers displaying the error modal.
 * @param {object} error - The error object.
 * @param {function} setError - Function to set error state.
 * @param {string} router - The router name.
 * @param {function} displayErrorModal - Function to display error modal.
 * @param {function} t - Translation function.
 */
export const handleApiErrors = (
  error,
  setError,
  router,
  displayErrorModal,
  t,
) => {
  if (!error) {
    throw new Error("Invalid error object provided.");
  }

  if (error.response) {
    devLog("error.response:", error.response);

    let errorType;

    switch (error.response.status) {
      case StatusCodes.UNPROCESSABLE_ENTITY:
        errorType = `${t(`${router}-router-unprocessable-error-${error.response.data.errors[0].replaceAll(" ", "-").replaceAll(".", "").toLowerCase()}`)}`;
        break;
      case StatusCodes.CONFLICT:
        errorType = `${t(`${router}-router-conflict-error-${error.response.data.message.replaceAll(" ", "-").replaceAll(".", "").toLowerCase()}`)}`;
        break;
      case StatusCodes.BAD_REQUEST:
        errorType = `${t(`${router}-router-bad-request-error-${error.response.data.message.replaceAll(" ", "-").replaceAll(".", "").toLowerCase()}`)}`;

        break;
      case StatusCodes.NOT_FOUND:
        errorType = `${t(`${router}-router-not-found-error-${error.response.data.message.replaceAll(" ", "-").replaceAll(".", "").toLowerCase()}`)}`;

        break;
      default:
        errorType = t(`generic-error-message`);
        break;
    }

    setError(errorType);
    displayErrorModal();
  }
};
