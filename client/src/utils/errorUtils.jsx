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
