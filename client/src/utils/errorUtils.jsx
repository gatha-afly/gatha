/**
 * Utility function to handle server errors and set the first error message only.
 * @param {Object} error - The error object.
 * @param {function} setError - The function to set the error state.
 */
export const handleServerErrors = (error, setError) => {
  // Handle errors from the server
  if (error.response && error.response.data && error.response.data.errors) {
    // Validation errors from server
    const serverErrors = error.response.data.errors;

    // Set the first error message only
    setError(serverErrors.length > 0 ? serverErrors[0].msg : null);
  }
};

/**
 * Utility function to handle other errors.
 * @param {Object} error - The error object.
 * @param {function} setError - The function to set the error state.
 * @param {string} [customErrorMessage] - Custom error message to set " Please try again later." is appended automatically.
 * @param {string} [errorType] - Type of the error (e.g., "validation", "authentication").
 */
export const handleOtherErrors = (
  error,
  setError,
  customErrorMessage = "Error. ",
  errorType = "other"
) => {
  // Handle other types of errors
  if (!error.response || !error.response.data || !error.response.data.errors) {
    console.error(`${errorType} error:`, error);
    setError(`${customErrorMessage} Please try again later.`);
  }
};
